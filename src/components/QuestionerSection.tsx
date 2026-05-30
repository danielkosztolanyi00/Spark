"use client";

import { useState } from "react";
import Questioner from "./Questioner";

interface QuestionerSectionProps {
  onComplete: (summary: Record<string, string>) => void;
}

export default function QuestionerSection({ onComplete }: QuestionerSectionProps) {
  const [started, setStarted] = useState(false);

  return (
    <section
      id="questioner"
      className="py-24 px-6"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Start here
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Find out what your website{" "}
            <span style={{ color: "var(--accent)" }}>actually needs</span>
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Answer 6 quick questions and I&apos;ll pre-fill a personalized inquiry
            for you. Takes about 90 seconds — no sign-up, no spam.
          </p>
        </div>

        {!started ? (
          <div className="text-center">
            <div
              className="inline-flex flex-col items-center gap-6 p-10 rounded-2xl max-w-md mx-auto"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="text-6xl">🗺️</span>
              <div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  Website Discovery Quiz
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  6 questions &middot; ~90 seconds &middot; No email required
                </p>
              </div>
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-3 rounded-xl font-semibold text-base w-full transition-all duration-200"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  boxShadow: "0 0 25px rgba(79,126,248,0.3)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "var(--accent-dark)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "var(--accent)";
                  el.style.transform = "none";
                }}
              >
                Let&apos;s go →
              </button>
            </div>
          </div>
        ) : (
          <div
            className="p-8 sm:p-12 rounded-2xl"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
          >
            <Questioner onComplete={onComplete} />
          </div>
        )}
      </div>
    </section>
  );
}
