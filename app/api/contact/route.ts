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

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kosudalepra0104@gmail.com",
      subject: "お問い合わせ",
      text: `Name: ${name}
Email: ${email}
Message:
${message}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
