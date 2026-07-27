import { put } from "@vercel/blob";
import { Resend } from "resend";
import {
  guardApiRequest,
  readJsonBody,
} from "@/src/lib/api-request-guard";
import {
  buildToolFeedbackBlobPath,
  buildToolFeedbackEmail,
  parseToolFeedback,
  type ToolFeedbackRecord,
} from "@/src/lib/tool-feedback";

const MAX_BODY_BYTES = 8_192;

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
  const guard = guardApiRequest(request, "tool-feedback", {
    limit: 10,
    windowMs: 10 * 60_000,
    maxBodyBytes: MAX_BODY_BYTES,
  });
  if (!guard.ok) return guard.response;

  try {
    const record = parseToolFeedback(
      await readJsonBody(request, MAX_BODY_BYTES),
    );
    if (!record) {
      return Response.json({ error: "invalid_payload" }, { status: 400 });
    }

    // Deliver to the first configured destination instead of fanning one
    // anonymous rating out to storage, a webhook, and email simultaneously.
    // If a configured destination fails, continue to the next fallback.
    const deliveries = [
      { name: "blob", run: () => saveToBlob(record) },
      { name: "webhook", run: () => sendToWebhook(record) },
      { name: "email", run: () => sendByEmail(record) },
    ] as const;
    let delivery: (typeof deliveries)[number]["name"] | null = null;

    for (const candidate of deliveries) {
      try {
        if (await candidate.run()) {
          delivery = candidate.name;
          break;
        }
      } catch (error) {
        console.error(
          `Tool feedback ${candidate.name} delivery failed:`,
          error,
        );
      }
    }

    if (!delivery) {
      if (process.env.NODE_ENV !== "production") {
        console.info("Tool feedback (development):", record);
        return Response.json({ success: true, delivery: "development_log" });
      }

      return Response.json({ error: "delivery_not_configured" }, { status: 503 });
    }

    return Response.json(
      { success: true, delivery },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof RangeError) {
      return Response.json({ error: "payload_too_large" }, { status: 413 });
    }
    console.error("Tool feedback API error:", error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
