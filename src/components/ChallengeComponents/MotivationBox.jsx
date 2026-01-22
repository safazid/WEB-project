/*
  MotivationBox
  -------------
  A small floating message box that appears as encouragement for the user.

  Props:
  - show (boolean):
      Controls whether the motivation message is visible or hidden.

  Behavior:
  - If `show` is false → nothing is rendered.
  - If `show` is true  → a fixed notification appears in the top-right corner
    with a motivational message.

  Purpose:
  - Give positive feedback and keep the user motivated during the app flow.
*/
export default function MotivationBox({ show }) {
  // Do not render anything if the box should not be visible
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 bg-[var(--card-bg)] p-4 rounded-xl shadow-lg border border-[var(--secondary)]">
      🌟 Great job! Keep pushing toward your goals!
    </div>
  );
}
