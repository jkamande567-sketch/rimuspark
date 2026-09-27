import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { submitInquiry } from "@/lib/contact.functions";
import { generateBrief, type ProjectBrief } from "@/lib/brief.functions";

function BriefList({ label, items }: { label: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="brief-block">
      <span className="brief-label">{label}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ContactForm() {
  const send = useServerFn(submitInquiry);
  const draft = useServerFn(generateBrief);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [brief, setBrief] = useState<ProjectBrief | null>(null);
  const [briefStatus, setBriefStatus] = useState<"idle" | "drafting" | "error">("idle");
  const [briefError, setBriefError] = useState("");
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });

  function update(field: keyof typeof values) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  async function onDraftBrief() {
    setBriefStatus("drafting");
    setBriefError("");
    try {
      const result = await draft({ data: { name: values.name, message: values.message } });
      setBrief(result.brief);
      setBriefStatus("idle");
    } catch (err) {
      setBriefStatus("error");
      setBriefError(err instanceof Error ? err.message : "We couldn't draft the brief just now.");
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setError("");
    try {
      await send({ data: { ...values, brief } });
      setStatus("sent");
      form.reset();
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try WhatsApp instead.");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form-grid">
        <label className="field">
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required placeholder="Jane Wanjiru" value={values.name} onChange={update("name")} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="you@business.co.ke" value={values.email} onChange={update("email")} />
        </label>
      </div>
      <label className="field">
        <span>Phone (optional)</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="+254 700 000 000" value={values.phone} onChange={update("phone")} />
      </label>
      <label className="field">
        <span>What do you need?</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about your business and what you're looking for."
          value={values.message}
          onChange={update("message")}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          className="button button-ghost focus-ring"
          type="button"
          onClick={onDraftBrief}
          disabled={briefStatus === "drafting" || values.message.trim().length < 20}
        >
          {briefStatus === "drafting" ? "Drafting brief…" : "Turn this into a project brief"} <Sparkles size={18} />
        </button>
        <p aria-live="polite" className="text-sm text-paper/75">
          {briefStatus === "drafting" && "Reading your notes and shaping a brief…"}
          {briefStatus === "error" && briefError}
        </p>
      </div>

      {brief && (
        <div className="brief-card" aria-live="polite">
          <span className="brief-kicker">Your project brief</span>
          <h4>{brief.title}</h4>
          <p>{brief.summary}</p>
          <div className="brief-block">
            <span className="brief-label">Project type</span>
            <p>{brief.projectType}</p>
          </div>
          <BriefList label="Goals" items={brief.goals} />
          <BriefList label="Deliverables" items={brief.deliverables} />
          <div className="brief-block">
            <span className="brief-label">Audience</span>
            <p>{brief.audience}</p>
          </div>
          <BriefList label="Key features" items={brief.keyFeatures} />
          <div className="brief-block">
            <span className="brief-label">Timeline</span>
            <p>{brief.suggestedTimeline}</p>
          </div>
          <div className="brief-block">
            <span className="brief-label">Budget</span>
            <p>{brief.budgetNote}</p>
          </div>
          <BriefList label="Open questions" items={brief.openQuestions} />
          <p className="brief-note">This draft is sent along with your inquiry. Edit your notes above and draft again if anything is off.</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button className="button button-accent focus-ring" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send inquiry"} <ArrowUpRight size={18} />
        </button>
        <p aria-live="polite" className="text-sm text-paper/75">
          {status === "sent" && "Thank you — your message is with us. We'll reply shortly."}
          {status === "error" && error}
        </p>
      </div>
    </form>
  );
}
