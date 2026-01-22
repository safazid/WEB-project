/*
  ProgressBar
  -----------
  A simple horizontal progress bar component.

  Props:
  - value (number):
      Progress percentage from 0 to 100.

  Behavior:
  - Renders a background bar (light gray).
  - Fills the inner bar based on `value`.
  - Uses a smooth animation when the width changes.

  Purpose:
  - Visually represent progress for challenges, goals, or any measurable task.
*/
export default function ProgressBar({ value }) {
  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-emerald-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
