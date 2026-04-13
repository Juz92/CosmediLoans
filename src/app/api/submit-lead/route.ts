import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";
const NOTIFY_EMAIL = "cosmediloans@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, name, email, phone, procedure, amount, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── 1. Append to Google Sheet ────────────────────────────────────
    if (SHEET_WEBHOOK_URL) {
      try {
        await fetch(SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source, name, email, phone, procedure, amount, message }),
        });
      } catch {
        // Non-fatal — sheet write failure shouldn't block the response
        console.error("Sheet webhook failed");
      }
    }

    // ── 2. Send notification email via Resend ────────────────────────
    await resend.emails.send({
      from: "CosmediLoans <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: `New Lead: ${name} — ${procedure || "General Enquiry"}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#1e40af;margin:0 0 16px">New CosmediLoans Lead</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#64748b;width:120px">Source</td><td style="padding:8px 0;font-weight:600">${source || "—"}</td></tr>
            <tr style="background:#f8fafc"><td style="padding:8px;color:#64748b">Name</td><td style="padding:8px;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#1e40af">${email}</a></td></tr>
            <tr style="background:#f8fafc"><td style="padding:8px;color:#64748b">Phone</td><td style="padding:8px;font-weight:600">${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Procedure</td><td style="padding:8px 0;font-weight:600">${procedure || "—"}</td></tr>
            <tr style="background:#f8fafc"><td style="padding:8px;color:#64748b">Amount</td><td style="padding:8px;font-weight:600">${amount || "—"}</td></tr>
            ${message ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Message</td><td style="padding:8px 0">${message}</td></tr>` : ""}
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#94a3b8">Submitted via CosmediLoans — ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("submit-lead error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
