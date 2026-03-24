import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return Response.json({ error: "missing_api_key" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = await req.json();

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kosudalepra0104@gmail.com",
      replyTo: email,
      subject: "お問い合わせ",
      text: `Name: ${name}
Email: ${email}
Message:
${message}`,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return Response.json(
        { error: "resend_failed", detail: result.error },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: result.data?.id ?? null });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
