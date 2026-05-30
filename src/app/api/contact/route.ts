import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "http://localhost:5678/webhook/08705061-5fb9-430b-9c06-18be1cda5ef0";

export async function POST(req: NextRequest) {
  const { name, email, business, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const res = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, business, message }),
  });

  if (!res.ok) {
    console.error("n8n webhook error:", res.status, await res.text());
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
