import { createHash } from "node:crypto";
import { getRequest } from "@tanstack/react-start/server";

const WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Keep these conservative — a real visitor almost never hits them; a script
// looping the endpoint does.
const LIMITS = {
  brief: 5, // calls a paid AI model — the expensive one to leave open
  inquiry: 10,
} as const;

type Bucket = keyof typeof LIMITS;

function hashIdentifier(value: string): string {
  // We only need a stable, non-reversible bucket key — not a secure secret —
  // so we don't have to store raw IP addresses at rest.
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}

/** Best-effort client identifier from request headers. Never throws. */
export function getClientIdentifier(): string {
  try {
    const request = getRequest();
    const forwardedFor = request?.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() || request?.headers.get("x-real-ip") || "unknown";
    return hashIdentifier(ip);
  } catch {
    return "unknown";
  }
}

/**
 * Returns true if the caller is still within the allowed rate for this
 * bucket, and records this call. Returns false if the limit is exceeded.
 * Fails OPEN on infrastructure errors — a broken rate limiter should never
 * be the reason a real customer's message doesn't get through.
 */
export async function checkRateLimit(bucket: Bucket): Promise<boolean> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const identifier = getClientIdentifier();
  const key = `${bucket}:${identifier}`;
  const since = new Date(Date.now() - WINDOW_MS).toISOString();

  const { count, error } = await supabaseAdmin
    .from("rate_limit_events")
    .select("id", { count: "exact", head: true })
    .eq("key", key)
    .gte("created_at", since);

  if (error) {
    console.error("rate limit check failed", error);
    return true;
  }

  if ((count ?? 0) >= LIMITS[bucket]) {
    return false;
  }

  const { error: insertError } = await supabaseAdmin.from("rate_limit_events").insert({ key });
  if (insertError) {
    console.error("rate limit record failed", insertError);
  }

  return true;
}
