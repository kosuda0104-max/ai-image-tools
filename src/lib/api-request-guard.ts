type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type GuardOptions = RateLimitOptions & {
  maxBodyBytes: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type GuardResult =
  | { ok: true }
  | { ok: false; response: Response };

const MAX_RATE_LIMIT_KEYS = 2_048;

const globalRateLimitStore = globalThis as typeof globalThis & {
  __filewispApiRateLimits?: Map<string, RateLimitEntry>;
};

function getRateLimitStore() {
  globalRateLimitStore.__filewispApiRateLimits ??= new Map();
  return globalRateLimitStore.__filewispApiRateLimits;
}

function jsonError(error: string, status: number, headers?: HeadersInit) {
  return Response.json(
    { error },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...headers,
      },
    },
  );
}

function getRequestKey(request: Request, scope: string) {
  const forwarded =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  return `${scope}:${ip}`;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    return originUrl.host === requestUrl.host;
  } catch {
    return false;
  }
}

function consumeRateLimit(
  request: Request,
  scope: string,
  options: RateLimitOptions,
  now = Date.now(),
) {
  const store = getRateLimitStore();

  if (store.size >= MAX_RATE_LIMIT_KEYS) {
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) store.delete(key);
    }
  }

  const key =
    store.size < MAX_RATE_LIMIT_KEYS
      ? getRequestKey(request, scope)
      : `${scope}:overflow`;
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  if (current.count >= options.limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1_000));
    return jsonError("rate_limited", 429, {
      "Retry-After": String(retryAfter),
    });
  }

  current.count += 1;
  return null;
}

export function guardApiRequest(
  request: Request,
  scope: string,
  options: GuardOptions,
): GuardResult {
  if (!isSameOrigin(request)) {
    return { ok: false, response: jsonError("invalid_origin", 403) };
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return {
      ok: false,
      response: jsonError("unsupported_media_type", 415),
    };
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (
    !Number.isFinite(contentLength) ||
    contentLength < 0 ||
    contentLength > options.maxBodyBytes
  ) {
    return { ok: false, response: jsonError("payload_too_large", 413) };
  }

  const rateLimitResponse = consumeRateLimit(request, scope, options);
  if (rateLimitResponse) {
    return { ok: false, response: rateLimitResponse };
  }

  return { ok: true };
}

export async function readJsonBody(
  request: Request,
  maxBodyBytes: number,
): Promise<unknown> {
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maxBodyBytes) {
    throw new RangeError("payload_too_large");
  }
  return JSON.parse(text);
}

export function resetApiRateLimitsForTests() {
  getRateLimitStore().clear();
}
