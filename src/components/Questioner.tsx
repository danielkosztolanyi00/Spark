"use client";

import { useState } from "react";

type Answer = string | string[];

interface Step {
  id: string;
  question: string;
  subtext?: string;
  type: "single" | "multi" | "scale";
  options: { label: string; emoji: string; description?: string }[];
}

const steps: Step[] = [
  {
    id: "has_website",
    question: "Does your business have a website right now?",
    subtext: "No judgment — this helps me understand where you're starting from.",
    type: "single",
    options: [
      { emoji: "✅", label: "Yes, we have one" },
      { emoji: "🚧", label: "Sort of — it's outdated" },
      { emoji: "❌", label: "No website yet" },
      { emoji: "🤔", label: "I'm not sure" },
    ],
  },
  {
    id: "goal",
    question: "What's the main goal of your new site?",
    subtext: "Pick the one that matters most to you.",
    type: "single",
    options: [
      { emoji: "🛒", label: "Sell products or services", description: "E-commerce or bookings" },
      { emoji: "📣", label: "Get noticed online", description: "Reach more customers" },
      { emoji: "📞", label: "Make it easy to contact me", description: "Phone, forms, directions" },
      { emoji: "💼", label: "Look more professional", description: "Build trust with clients" },
    ],
  },
  {
    id: "style",
    question: "What look and feel do you want your site to have?",
    subtext: "You can pick more than one — they often mix well.",
    type: "multi",
    options: [
      { emoji: "🎩", label: "Clean & professional", description: "Trustworthy, corporate" },
      { emoji: "✨", label: "Modern & sleek", description: "Dark, polished, premium" },
      { emoji: "🌿", label: "Warm & friendly", description: "Approachable, community feel" },
      { emoji: "🎨", label: "Creative & bold", description: "Colorful, expressive, unique" },
    ],
  },
  {
    id: "industry",
    question: "What industry or field are you in?",
    type: "single",
    options: [
      { emoji: "🍽️", label: "Food & hospitality" },
      { emoji: "🏗️", label: "Construction & trades" },
      { emoji: "💆", label: "Health & wellness" },
      { emoji: "🛍️", label: "Retail & e-commerce" },
    ],
  },
  {
    id: "urgency",
    question: "When would you like your site to be ready?",
    type: "single",
    options: [
      { emoji: "🔥", label: "ASAP — yesterday if possible" },
      { emoji: "📅", label: "Within the next month" },
      { emoji: "🗓️", label: "1–3 months from now" },
      { emoji: "🌱", label: "Just exploring for now" },
    ],
  },
  {
    id: "budget",
    question: "Do you have a rough budget range in mind?",
    subtext: "Totally optional — it helps me tailor the right approach.",
    type: "single",
    options: [
      { emoji: "💡", label: "Under €500" },
      { emoji: "💼", label: "€500 – €1,500" },
      { emoji: "🚀", label: "€1,500 – €3,000" },
      { emoji: "🏢", label: "€3,000+" },
    ],
  },
];

function buildSummary(answers: Record<string, Answer>): Record<string, string> {
  const label = (id: string): string => {
    const step = steps.find((s) => s.id === id);
    if (!step) return "";
    const ans = answers[id];
    if (!ans) return "";
    if (Array.isArray(ans)) {
      return ans
        .map((a) => step.options.find((o) => o.label === a)?.label ?? a)
        .join(", ");
    }
    return String(ans);
  };

  return {
    has_website: label("has_website"),
    goal: label("goal"),
    style: label("style"),
    industry: label("industry"),
    urgency: label("urgency"),
    budget: label("budget"),
  };
}

interface QuestionerProps {
  onComplete: (summary: Record<string, string>) => void;
}

export default function Questioner({ onComplete }: QuestionerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [done, setDone] = useState(false);

  const step = steps[stepIndex];
  const progress = ((stepIndex) / steps.length) * 100;
  const current = answers[step.id];

  function select(option: string) {
    if (step.type === "multi") {
      const prev = (answers[step.id] as string[]) ?? [];
      const next = prev.includes(option)
        ? prev.filter((v) => v !== option)
        : [...prev, option];
      setAnswers((a) => ({ ...a, [step.id]: next }));
    } else {
      setAnswers((a) => ({ ...a, [step.id]: option }));
    }
  }

  function isSelected(option: string): boolean {
    if (step.type === "multi") {
      return ((answers[step.id] as string[]) ?? []).includes(option);
    }
    return answers[step.id] === option;
  }

  function canAdvance(): boolean {
    const ans = answers[step.id];
    if (!ans) return false;
    if (Array.isArray(ans)) return ans.length > 0;
    return true;
  }

  function next() {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      const summary = buildSummary(answers);
      setDone(true);
      onComplete(summary);
    }
  }

  function back() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  if (done) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
          Perfect — all set!
        </h3>
        <p style={{ color: "var(--muted)" }}>
          Scroll down to finish with your contact details and I&apos;ll be in
          touch with a tailored proposal.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2" style={{ color: "var(--muted)" }}>
          <span>
            Question {stepIndex + 1} of {steps.length}
          </span>
          <span>{Math.round(progress)}% done</span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "var(--accent)",
              boxShadow: "0 0 10px rgba(79,126,248,0.5)",
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-2">
        <h3
          className="text-xl sm:text-2xl font-bold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          {step.question}
        </h3>
        {step.subtext && (
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {step.subtext}
          </p>
        )}
      </div>

      {step.type === "multi" && (
        <p className="text-xs mb-4 mt-1" style={{ color: "var(--accent)" }}>
          Select all that apply
        </p>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 mt-4">
        {step.options.map((opt) => {
          const selected = isSelected(opt.label);
          return (
            <button
              key={opt.label}
              onClick={() => select(opt.label)}
              className="text-left px-5 py-4 rounded-xl transition-all duration-200 flex gap-3 items-start"
              style={{
                background: selected ? "var(--accent-glow)" : "var(--surface-2)",
                border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
                boxShadow: selected ? "0 0 20px rgba(79,126,248,0.15)" : "none",
                transform: selected ? "scale(1.01)" : "scale(1)",
              }}
            >
              <span className="text-2xl leading-none mt-0.5">{opt.emoji}</span>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: selected ? "var(--accent)" : "var(--foreground)" }}
                >
                  {opt.label}
                </p>
                {opt.description && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                    {opt.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Nav buttons */}
      <div className="flex justify-between">
        <button
          onClick={back}
          disabled={stepIndex === 0}
          className="text-sm px-5 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-30"
          style={{
            border: "1px solid var(--border)",
            color: "var(--muted)",
            background: "transparent",
          }}
        >
          ← Back
        </button>
        <button
          onClick={next}
          disabled={!canAdvance()}
          className="text-sm px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: canAdvance() ? "var(--accent)" : "var(--surface-2)",
            color: canAdvance() ? "#fff" : "var(--muted)",
          }}
        >
          {stepIndex === steps.length - 1 ? "Finish ✓" : "Next →"}
        </button>
      </div>
    </div>
  );
}
