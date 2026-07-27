import { Resend } from "resend";
import {
  guardApiRequest,
  readJsonBody,
} from "@/src/lib/api-request-guard";

type ContactLocale = "ja" | "en";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  tool?: unknown;
  locale?: unknown;
  website?: unknown;
};

const MAX_BODY_BYTES = 8_192;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeLocale(locale: unknown): ContactLocale {
  return locale === "en" ? "en" : "ja";
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function buildContactEmail(payload: ContactPayload) {
  const locale = normalizeLocale(payload.locale);
  const safeName = cleanText(payload.name, 80);
  const safeEmail = cleanText(payload.email, 254);
  const safeMessage = cleanText(payload.message, 4_000);
  const safeTool = cleanText(payload.tool, 120);

  if (
    !safeName ||
    !safeEmail ||
    !emailPattern.test(safeEmail) ||
    !safeMessage
  ) {
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
  const guard = guardApiRequest(req, "contact", {
    limit: 3,
    windowMs: 10 * 60_000,
    maxBodyBytes: MAX_BODY_BYTES,
  });
  if (!guard.ok) return guard.response;

  try {
    const payload = (await readJsonBody(req, MAX_BODY_BYTES)) as ContactPayload;

    // A hidden browser-only field. Bots that complete every field receive a
    // generic success response without triggering email or storage work.
    if (cleanText(payload.website, 200)) {
      return Response.json(
        { success: true },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

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
    const emailContent = buildContactEmail(payload);

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

    return Response.json(
      { success: true, id: result.data?.id ?? null },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof RangeError) {
      return Response.json({ error: "payload_too_large" }, { status: 413 });
    }
    console.error("Contact API error:", error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
