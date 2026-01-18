export default function Footer() {
  return (
    <footer
      className="py-10 text-center border-t"
      style={{
        borderColor: "var(--primary-soft)",
        color: "var(--text-sub)",
        background: "var(--bg)",
      }}
    >
      <p className="font-semibold text-lg">FitRise © 2025</p>
      <p className="text-sm mt-2">
        AI-powered fitness • Smart challenges • Better habits
      </p>
    </footer>
  );
}
