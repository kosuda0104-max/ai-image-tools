import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kosudalepra0104@gmail.com",
      subject: "お問い合わせ",
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
