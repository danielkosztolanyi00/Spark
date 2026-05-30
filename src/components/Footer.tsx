export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-8 px-6 text-center text-sm"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        color: "var(--muted)",
      }}
    >
      <p>
        &copy; {year} Daniel. Built with Next.js &amp; Tailwind CSS.
      </p>
    </footer>
  );
}
