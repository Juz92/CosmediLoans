import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSubmissionSchema, type LeadSubmissionData } from "@/lib/leads";
import { buildLeadReportRow, type LeadReportRow } from "@/lib/server/lead-reporting";
import { SITE_ORIGIN } from "@/lib/site";

const SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";
const NOTIFY_EMAIL = "cosmediloans@gmail.com";
const RATE_LIMIT = 10;
const RATE_WINDOW = 60_000;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;

  const allowedOrigins = [SITE_ORIGIN, SITE_ORIGIN.replace("://www.", "://")];
  if (allowedOrigins.includes(origin)) return true;

  if (process.env.NODE_ENV === "development") {
    try {
      const url = new URL(origin);
      return url.hostname === "localhost" || url.hostname === "127.0.0.1";
    } catch {
      return false;
    }
  }

  return false;
}

async function parsePayload(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await request.formData();
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = typeof value === "string" ? value : value.name;
    });
    return payload;
  }

  return null;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function maskPhone(phone?: string) {
  if (!phone) return "Not provided";
  return `${phone.slice(0, 4)}****`;
}

function leadRows(lead: LeadSubmissionData, report: LeadReportRow) {
  return [
    ["Source", lead.source || "Not provided"],
    ["Name", lead.fullName || "Not provided"],
    ["Email", lead.email],
    ["Phone", lead.phone || "Not provided"],
    ["Procedure", lead.procedure || "Not provided"],
    ["Procedure slug", report.procedureSlug || "Not provided"],
    ["Location slug", report.locationSlug || "Not provided"],
    ["Amount", lead.amount || "Not provided"],
    ["Page", lead.pageOrigin || "Not provided"],
    ["Landing page", report.landingPage || "Not provided"],
    ["Current page", report.currentPage || "Not provided"],
    ["Landing page type", report.landingPageType || "Not provided"],
    ["Traffic channel", report.trafficChannel || "Not provided"],
    ["Referrer", report.referrer || "Not provided"],
    ["UTM Source", lead.utmSource || "Not provided"],
    ["UTM Medium", lead.utmMedium || "Not provided"],
    ["UTM Campaign", lead.utmCampaign || "Not provided"],
    ["UTM Content", lead.utmContent || "Not provided"],
    ["UTM Term", lead.utmTerm || "Not provided"],
    ["Lead status", report.leadStatus],
    ["Lead quality", report.leadQuality],
    ["Booked call", report.bookedCallAt || "Not set"],
    ["Funded outcome", report.fundedOutcome || "Not set"],
    ["Message", lead.message || "Not provided"],
  ] as const;
}

async function sendToSheet(report: LeadReportRow) {
  if (!SHEET_WEBHOOK_URL) return "not_configured" as const;

  const response = await fetch(SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error(`Sheet webhook failed with ${response.status}`);
  }

  return "sent" as const;
}

async function sendNotification(lead: LeadSubmissionData, report: LeadReportRow) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return "not_configured" as const;

  const rows = leadRows(lead, report)
    .map(
      ([label, value], index) => `
        <tr style="${index % 2 === 1 ? "background:#f8fafc" : ""}">
          <td style="padding:8px;color:#64748b;width:140px;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:8px;font-weight:${label === "Message" ? "400" : "600"}">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const resend = new Resend(resendApiKey);
  await resend.emails.send({
    from: "CosmediLoans <onboarding@resend.dev>",
    to: NOTIFY_EMAIL,
    subject: `New Lead: ${lead.fullName || lead.email} - ${
      lead.procedure || lead.source || "General Enquiry"
    }`,
    html: `
      <div style="font-family:sans-serif;max-width:640px;margin:0 auto;padding:24px">
        <h2 style="color:#1e40af;margin:0 0 16px">New CosmediLoans Lead</h2>
        <table style="width:100%;border-collapse:collapse">${rows}</table>
        <p style="margin:24px 0 0;font-size:12px;color:#94a3b8">Submitted via CosmediLoans on ${escapeHtml(
          new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })
        )}</p>
      </div>
    `,
  });

  return "sent" as const;
}

export async function handleLeadPost(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    if (!isAllowedOrigin(request.headers.get("origin"))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const payload = await parsePayload(request);
    if (!payload) {
      return NextResponse.json(
        { error: "Content-Type must be application/json or form encoded" },
        { status: 415 }
      );
    }

    const result = leadSubmissionSchema.safeParse(payload);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const lead = result.data;
    const report = buildLeadReportRow(lead);
    console.log("New lead received:", {
      ...lead,
      landingPageType: report.landingPageType,
      trafficChannel: report.trafficChannel,
      procedureSlug: report.procedureSlug,
      locationSlug: report.locationSlug,
      phone: maskPhone(lead.phone),
    });

    const delivery = {
      sheet: "not_configured" as "not_configured" | "sent" | "failed",
      email: "not_configured" as "not_configured" | "sent" | "failed",
    };
    const errors: string[] = [];

    try {
      delivery.sheet = await sendToSheet(report);
    } catch (error) {
      delivery.sheet = "failed";
      errors.push(error instanceof Error ? error.message : "Sheet webhook failed");
    }

    try {
      delivery.email = await sendNotification(lead, report);
    } catch (error) {
      delivery.email = "failed";
      errors.push(error instanceof Error ? error.message : "Lead notification failed");
    }

    const configuredDestinations = Object.values(delivery).filter(
      (status) => status !== "not_configured"
    );
    const delivered = configuredDestinations.some((status) => status === "sent");

    if (!delivered && configuredDestinations.length > 0) {
      return NextResponse.json(
        { error: "Lead delivery failed", details: errors },
        { status: 502 }
      );
    }

    if (!delivered && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Lead delivery is not configured" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      delivery,
      developmentOnly: !delivered,
    });
  } catch (error) {
    console.error("lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
