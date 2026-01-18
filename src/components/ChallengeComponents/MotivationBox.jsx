export default function MotivationBox({ show }) {
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 bg-[var(--card-bg)] p-4 rounded-xl shadow-lg border border-[var(--secondary)]">
      🌟 Great job! Keep pushing toward your goals!
    </div>
  );
}
