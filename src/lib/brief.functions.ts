import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch } from "./ai-gateway.server";
import { checkRateLimit } from "./rate-limit.server";

export const briefSchema = z.object({
  title: z.string(),
  summary: z.string(),
  projectType: z.string(),
  goals: z.array(z.string()),
  deliverables: z.array(z.string()),
  audience: z.string(),
  keyFeatures: z.array(z.string()),
  suggestedTimeline: z.string(),
  budgetNote: z.string(),
  openQuestions: z.array(z.string()),
});

export type ProjectBrief = z.infer<typeof briefSchema>;

function validate(data: unknown): { message: string; name: string } {
  const value = (data ?? {}) as Record<string, unknown>;
  const message = String(value["message"] ?? "").trim();
  const name = String(value["name"] ?? "").trim();
  if (message.length < 20) {
    throw new Error("Please describe your project in a sentence or two first.");
  }
  if (message.length > 4000) {
    throw new Error("That description is too long — please shorten it.");
  }
  return { message, name };
}

export const generateBrief = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const allowed = await checkRateLimit("brief");
    if (!allowed) {
      throw new Error(
        "You've hit the limit for AI-drafted briefs for now — please try again later, or just send your message directly.",
      );
    }

    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("The brief assistant isn't configured yet.");

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    try {
      const result = streamText({
        model: lovable.responses("openai/gpt-6-astra"),
        output: Output.object({ schema: briefSchema }),
        system:
          "You are a project intake assistant for Rimu Creatives, a digital creative and business solutions studio in Nairobi, Kenya. " +
          "Turn a prospective client's rough description into a clear, structured project brief. " +
          "Services offered: web design and development, app development, graphic design, social content, and video. " +
          "Be concrete and concise: each list item is one short line, at most 5 items per list. " +
          "Only infer what is reasonable; put real uncertainties in openQuestions. " +
          "Use Kenyan Shilling (KES) framing in budgetNote and say clearly if no budget was given.",
        prompt: `Client name: ${data.name || "not given"}\n\nClient's description:\n${data.message}`,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });

      const brief = await result.output;
      return { brief: brief as ProjectBrief };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("We couldn't draft the brief just now. Please try again.");
      }
      console.error("brief generation failed", error);
      const status = (error as { statusCode?: number })?.statusCode;
      if (status === 429)
        throw new Error("The brief assistant is busy — please try again in a moment.");
      if (status === 402)
        throw new Error(
          "The brief assistant is temporarily unavailable. Please send your message instead.",
        );
      throw new Error("We couldn't draft the brief just now. Please try again.");
    }
  });
