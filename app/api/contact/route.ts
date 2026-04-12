import { Resend } from "resend";

type ContactLocale = "ja" | "en";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  tool?: unknown;
  locale?: unknown;
};

function normalizeLocale(locale: unknown): ContactLocale {
  return locale === "en" ? "en" : "ja";
}

export function buildContactEmail(payload: ContactPayload) {
  const locale = normalizeLocale(payload.locale);
  const safeName = typeof payload.name === "string" ? payload.name.trim() : "";
  const safeEmail =
    typeof payload.email === "string" ? payload.email.trim() : "";
  const safeMessage =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const safeTool = typeof payload.tool === "string" ? payload.tool.trim() : "";

  if (!safeName || !safeEmail || !safeMessage) {
    return null;
  }

  const subject =
    locale === "en" ? "Contact form submission" : "お問い合わせフォーム送信";
  const text =
    locale === "en"
      ? `Name: ${safeName}
Email: ${safeEmail}
Tool: ${safeTool || "-"}
Message:
${safeMessage}`
      : `お名前: ${safeName}
メールアドレス: ${safeEmail}
対象ツール: ${safeTool || "未指定"}
メッセージ:
${safeMessage}`;

  return {
    safeEmail,
    subject,
    text,
  };
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return Response.json({ error: "missing_api_key" }, { status: 500 });
    }

    if (!contactEmail) {
      console.error("CONTACT_TO_EMAIL is not set");
      return Response.json({ error: "missing_contact_email" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const emailContent = buildContactEmail(await req.json());

    if (!emailContent) {
      return Response.json({ error: "invalid_payload" }, { status: 400 });
    }

    const result = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: emailContent.safeEmail,
      subject: emailContent.subject,
      text: emailContent.text,
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
