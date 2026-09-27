import { supabase } from "@/integrations/supabase/client";

export type ContactChannel =
  "instagram" | "whatsapp" | "email" | "phone" | "facebook" | "x" | "tiktok";

export type DeviceType = "mobile" | "tablet" | "desktop";

function detectDevice(): DeviceType {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  // iPadOS 13+ reports as Mac, so also check for touch support on a Mac UA.
  const isIpadOs =
    /Macintosh/i.test(ua) &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;
  if (/iPad|Tablet/i.test(ua) || isIpadOs) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
}

/** Fire-and-forget click logging. Never blocks or breaks navigation. */
export function trackContactClick(channel: ContactChannel, location: string) {
  try {
    void supabase
      .from("contact_clicks")
      .insert({
        channel,
        location,
        path: typeof window === "undefined" ? null : window.location.pathname,
        device: detectDevice(),
      })
      .then(
        () => undefined,
        () => undefined,
      );
  } catch {
    /* analytics must never break the link */
  }
}

export function channelForSocial(name: string): ContactChannel | null {
  const key = name.trim().toLowerCase();
  if (key === "instagram") return "instagram";
  if (key === "facebook") return "facebook";
  if (key === "x" || key === "twitter") return "x";
  if (key === "tiktok") return "tiktok";
  if (key === "whatsapp") return "whatsapp";
  if (key === "call" || key === "phone") return "phone";
  return null;
}
