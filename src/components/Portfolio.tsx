"use client";

const projects = [
  {
    title: "Kovács Villanyszerelés",
    description:
      "Teljes weboldal egy szegedi villanyszerelő családi vállalkozásnak. Szolgáltatások, bemutatkozás, kapcsolatfelvételi űrlap — mobilbarát, gyors, modern.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Static Export"],
    href: "https://kovacs-villany.danielkosztolanyi.com",
    thumbnail: {
      bg: "linear-gradient(135deg, #1c3557 0%, #0f1e35 100%)",
      accent: "#f59e0b",
      icon: "⚡",
      label: "Kovács Villanyszerelés",
      sub: "Szeged, 1993–",
    },
    placeholder: false,
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
          {projects.map((project, i) => {
            const Wrapper = project.href ? "a" : "div";
            const wrapperProps = project.href
              ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={i}
                {...wrapperProps}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 no-underline"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 8px 30px rgba(79,126,248,0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.transform = "none";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Thumbnail */}
                {project.thumbnail ? (
                  <div
                    className="w-full h-40 rounded-xl flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                    style={{ background: project.thumbnail.bg }}
                  >
                    <div
                      className="absolute top-1/2 right-4 -translate-y-1/2 w-32 h-32 rounded-full blur-2xl opacity-20"
                      style={{ background: project.thumbnail.accent }}
                    />
                    <span className="text-3xl">{project.thumbnail.icon}</span>
                    <span className="text-sm font-bold text-white">{project.thumbnail.label}</span>
                    <span className="text-xs" style={{ color: project.thumbnail.accent }}>{project.thumbnail.sub}</span>
                  </div>
                ) : (
                  <div
                    className="w-full h-40 rounded-xl flex items-center justify-center"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px dashed var(--border)",
                    }}
                  >
                    <span className="text-3xl opacity-30" style={{ color: "var(--accent)" }}>◇</span>
                  </div>
                )}

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

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-lg" style={{ color: "var(--foreground)" }}>
                      {project.title}
                    </h3>
                    {project.href && (
                      <span className="text-xs" style={{ color: "var(--accent)" }}>↗</span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {project.description}
                  </p>
                </div>
              </Wrapper>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            Want your project here? Let&apos;s talk →
          </a>
        </div>
      </div>
    </section>
  );
}
