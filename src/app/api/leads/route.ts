import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const lead = result.data;

    // TODO: Forward to webhook/CRM
    // For now, log and return success
    console.log("New lead received:", lead);

    // Placeholder for webhook forwarding:
    // const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(lead),
    //   });
    // }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
