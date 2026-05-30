"use client";

import { useEffect, useState } from "react";

const roles = ["Web Developer", "UI Designer", "Your Digital Partner"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.4,
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,126,248,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl">
        <p
          className="text-sm font-medium tracking-widest uppercase mb-6"
          style={{ color: "var(--accent)" }}
        >
          Available for projects
        </p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Hi, I&apos;m{" "}
          <span
            style={{
              color: "var(--accent)",
              textShadow: "0 0 40px rgba(79,126,248,0.4)",
            }}
          >
            Daniel
          </span>
          .
        </h1>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 h-12 flex items-center justify-center gap-1"
          style={{ color: "var(--muted)" }}
        >
          <span>{displayed}</span>
          <span
            className="inline-block w-0.5 h-8 animate-pulse"
            style={{ background: "var(--accent)" }}
          />
        </h2>

        <p
          className="text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          I build fast, beautiful, and purposeful websites for businesses and
          individuals — from landing pages to full web apps. Let&apos;s turn
          your idea into something people love to use.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#questioner"
            className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(79,126,248,0.35)",
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
            Start your project →
          </a>
          <a
            href="#work"
            className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200"
            style={{
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--surface)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.transform = "none";
            }}
          >
            See my work
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          scroll down
        </span>
        <div
          className="w-px h-10 animate-pulse"
          style={{ background: "linear-gradient(to bottom, var(--muted), transparent)" }}
        />
      </div>
    </section>
  );
}
