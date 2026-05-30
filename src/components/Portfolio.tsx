"use client";

const projects = [
  {
    title: "Coming soon",
    description: "First client project in progress. Check back soon.",
    tags: ["Next.js", "Tailwind"],
    placeholder: true,
  },
  {
    title: "Coming soon",
    description: "More projects launching shortly.",
    tags: ["React", "TypeScript"],
    placeholder: true,
  },
  {
    title: "Coming soon",
    description: "Portfolio growing — building something great.",
    tags: ["Design", "UX"],
    placeholder: true,
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="py-24 px-6" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            My work
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Projects
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Just getting started — the first projects are on their way. I&apos;d
            love for yours to be one of them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--accent)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 8px 30px rgba(79,126,248,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border)";
                el.style.transform = "none";
                el.style.boxShadow = "none";
              }}
            >
              {/* Thumbnail placeholder */}
              <div
                className="w-full h-40 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--surface-2)",
                  border: "1px dashed var(--border)",
                }}
              >
                <span
                  className="text-3xl opacity-30"
                  style={{ color: "var(--accent)" }}
                >
                  ◇
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                      border: "1px solid rgba(79,126,248,0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            Want to be my first client? Let&apos;s talk →
          </a>
        </div>
      </div>
    </section>
  );
}
