import { put } from "@vercel/blob";
import { Resend } from "resend";
import {
  buildToolFeedbackBlobPath,
  buildToolFeedbackEmail,
  parseToolFeedback,
  type ToolFeedbackRecord,
} from "@/src/lib/tool-feedback";

async function saveToBlob(record: ToolFeedbackRecord) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return false;

  await put(
    buildToolFeedbackBlobPath(record),
    JSON.stringify(record, null, 2),
    {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    },
  );

  return true;
}

async function sendToWebhook(record: ToolFeedbackRecord) {
  const webhookUrl = process.env.TOOL_FEEDBACK_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Feedback webhook returned ${response.status}`);
  }

  return true;
}

async function sendByEmail(record: ToolFeedbackRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TOOL_FEEDBACK_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const email = buildToolFeedbackEmail(record);
  const result = await new Resend(apiKey).emails.send({
    from,
    to,
    subject: email.subject,
    text: email.text,
  });

  if (result.error) {
    throw new Error(`Resend failed: ${result.error.message}`);
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 8_192) {
      return Response.json({ error: "payload_too_large" }, { status: 413 });
    }

    const record = parseToolFeedback(await request.json());
    if (!record) {
      return Response.json({ error: "invalid_payload" }, { status: 400 });
    }

    const deliveries = await Promise.allSettled([
      saveToBlob(record),
      sendToWebhook(record),
      sendByEmail(record),
    ]);
    const delivered = deliveries.some(
      (result) => result.status === "fulfilled" && result.value,
    );

    for (const result of deliveries) {
      if (result.status === "rejected") {
        console.error("Tool feedback delivery failed:", result.reason);
      }
    }

    if (!delivered) {
      if (process.env.NODE_ENV !== "production") {
        console.info("Tool feedback (development):", record);
        return Response.json({ success: true, delivery: "development_log" });
      }

      return Response.json({ error: "delivery_not_configured" }, { status: 503 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Tool feedback API error:", error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
