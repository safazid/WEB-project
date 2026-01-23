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
export default function ProgressBar({ value = 0 }) {
  return (
    <div
      className="w-full h-2 rounded overflow-hidden"
      style={{
        background: "color-mix(in srgb, var(--primary) 25%, transparent)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${value}%`,
          background: "var(--primary)",
        }}
      />
    </div>
  );
}

