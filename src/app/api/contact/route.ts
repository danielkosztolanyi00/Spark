import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, business, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <contact@danielkosztolanyi.com>",
    to: "daniel.kosztolanyi00@gmail.com",
    replyTo: email,
    subject: `New inquiry from ${name}${business ? ` — ${business}` : ""}`,
    text: [
      `From: ${name} <${email}>`,
      business ? `Business: ${business}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#4f7ef8">New project inquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0"><strong>${name}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
          ${business ? `<tr><td style="padding:8px 0;color:#666">Business</td><td style="padding:8px 0">${business}</td></tr>` : ""}
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p style="white-space:pre-wrap;line-height:1.6">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p style="color:#999;font-size:12px">Sent from danielkosztolanyi.com</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
