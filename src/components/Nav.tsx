"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#questioner" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(12,15,26,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="font-semibold text-lg tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Daniel<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.background = "var(--accent-dark)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.background = "var(--accent)")
              }
            >
              Get in touch
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--foreground)",
              transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--foreground)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--foreground)",
              transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "240px" : "0px",
          background: "rgba(12,15,26,0.96)",
          borderBottom: menuOpen ? "1px solid var(--border)" : "none",
        }}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm block"
                style={{ color: "var(--muted)" }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-sm px-4 py-2 rounded-lg font-medium inline-block"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
