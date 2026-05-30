"use client";

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Node.js", "PostgreSQL", "Figma", "Vercel",
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div>
          <p
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            About me
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Developer who cares about{" "}
            <span style={{ color: "var(--accent)" }}>results</span>, not just
            code.
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--muted)" }}
          >
            I&apos;m Daniel — a web developer focused on building websites that
            actually work for your business. That means fast load times,
            intuitive layouts, and designs that convert visitors into customers.
          </p>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--muted)" }}
          >
            Whether you&apos;re a local business without a web presence yet, or
            a company whose existing site needs a serious upgrade — I&apos;m
            here to help you look great online and make it easy for customers to
            reach you.
          </p>

          <a
            href="#contact"
            className="text-sm font-medium underline underline-offset-4 transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            Let&apos;s talk about your project →
          </a>
        </div>

        {/* Skills side */}
        <div>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-5"
            style={{ color: "var(--muted)" }}
          >
            Technologies I work with
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { number: "100%", label: "Client focus" },
              { number: "Fast", label: "Delivery" },
              { number: "∞", label: "Revisions attitude" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  {stat.number}
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
