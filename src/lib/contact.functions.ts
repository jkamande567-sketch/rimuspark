import { createServerFn } from "@tanstack/react-start";
import type { ProjectBrief } from "./brief.functions";
import { checkRateLimit } from "./rate-limit.server";

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  brief: ProjectBrief | null;
};

function validate(data: unknown): ContactInput {
  const value = (data ?? {}) as Record<string, unknown>;
  const name = String(value["name"] ?? "").trim();
  const email = String(value["email"] ?? "").trim();
  const phone = String(value["phone"] ?? "").trim();
  const message = String(value["message"] ?? "").trim();
  const brief = (value["brief"] ?? null) as ProjectBrief | null;

  if (name.length < 2) throw new Error("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.");
  if (message.length < 10) throw new Error("Please tell us a little more about your project.");
  if (name.length > 120 || email.length > 160 || phone.length > 40 || message.length > 4000) {
    throw new Error("That message is too long — please shorten it.");
  }

  return { name, email, phone, message, brief };
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const allowed = await checkRateLimit("inquiry");
    if (!allowed) {
      throw new Error(
        "Too many messages sent from this connection — please try WhatsApp instead, or try again later.",
      );
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      brief: data.brief ?? null,
    });

    if (error) {
      console.error("contact inquiry insert failed", error);
      throw new Error("We couldn't send that just now. Please try WhatsApp instead.");
    }

    return { ok: true } as const;
  });
