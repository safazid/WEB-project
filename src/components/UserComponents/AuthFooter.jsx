// Simple footer for the authentication pages.
// Displays a clean copyright message and stays fixed at the bottom layout.
export default function AuthFooter() {
  return (
    <footer
      className="
        w-full text-center py-6 mt-auto
        border-t border-[var(--primary-soft)]
        text-sm tracking-wide flex-shrink-0
      "
      style={{ color: "var(--text-sub)" }}
    >
      <span className="opacity-80">
        © 2025 FitAI — All Rights Reserved
      </span>
    </footer>
  );
}