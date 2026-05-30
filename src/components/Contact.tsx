"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  business: string;
  message: string;
}

interface ContactProps {
  prefill?: Record<string, string>;
}

function buildMessage(prefill: Record<string, string>): string {
  const lines: string[] = [];
  if (prefill.has_website) lines.push(`Current website status: ${prefill.has_website}`);
  if (prefill.goal) lines.push(`Main goal: ${prefill.goal}`);
  if (prefill.style) lines.push(`Preferred style: ${prefill.style}`);
  if (prefill.industry) lines.push(`Industry: ${prefill.industry}`);
  if (prefill.urgency) lines.push(`Timeline: ${prefill.urgency}`);
  if (prefill.budget) lines.push(`Budget range: ${prefill.budget}`);
  return lines.length > 0
    ? `Here's a summary from the discovery quiz:\n\n${lines.join("\n")}\n\n[Add any extra details here]`
    : "";
}

export default function Contact({ prefill }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (prefill && Object.keys(prefill).length > 0) {
      const msg = buildMessage(prefill);
      if (msg) setValue("message", msg);
    }
  }, [prefill, setValue]);

  async function onSubmit(data: FormValues) {
    setLoading(true);
    // TODO: wire up email backend (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form submitted:", data);
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <section id="contact" className="py-24 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">🙌</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
            Message received!
          </h2>
          <p style={{ color: "var(--muted)" }}>
            Thanks for reaching out. I&apos;ll get back to you within 24 hours
            with thoughts and next steps.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left side */}
        <div>
          <p
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Contact
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Ready to build something{" "}
            <span style={{ color: "var(--accent)" }}>great?</span>
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
            Whether you have a full brief or just a vague idea — I&apos;m happy
            to chat. Send me a message and let&apos;s figure out what&apos;s
            best for your project together.
          </p>

          <div className="flex flex-col gap-4">
            {[
              { emoji: "⚡", label: "Fast response", desc: "Usually within 24 hours" },
              { emoji: "💬", label: "Free consultation", desc: "First call is always free" },
              { emoji: "🤝", label: "No obligations", desc: "Talk first, decide later" },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 items-start">
                <span className="text-xl mt-0.5">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form side */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-8 rounded-2xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {prefill && Object.keys(prefill).length > 0 && (
            <div
              className="text-xs px-4 py-3 rounded-lg mb-1"
              style={{
                background: "var(--accent-glow)",
                border: "1px solid rgba(79,126,248,0.25)",
                color: "var(--accent)",
              }}
            >
              ✓ Pre-filled from your discovery quiz
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Your name" error={errors.name?.message}>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Jane Smith"
                className="form-input"
              />
            </Field>
            <Field label="Email address" error={errors.email?.message}>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                })}
                type="email"
                placeholder="jane@company.com"
                className="form-input"
              />
            </Field>
          </div>

          <Field label="Business / project name (optional)">
            <input
              {...register("business")}
              placeholder="Acme Corp or 'my new online store'"
              className="form-input"
            />
          </Field>

          <Field label="Tell me about your project" error={errors.message?.message}>
            <textarea
              {...register("message", { required: "Please describe your project" })}
              rows={7}
              placeholder="What kind of website do you need? What's the goal? Any inspiration or references?"
              className="form-input resize-none"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-60"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 0 25px rgba(79,126,248,0.25)",
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget as HTMLElement).style.background = "var(--accent-dark)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
            }}
          >
            {loading ? "Sending…" : "Send message →"}
          </button>

          <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
            No spam. Your info is only used to respond to your inquiry.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
        {label}
      </label>
      {children}
      {error && <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>}
    </div>
  );
}
