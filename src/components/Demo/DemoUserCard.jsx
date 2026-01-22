export default function DemoUserCard() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--primary-soft)",
      }}
    >
      {/* Title */}
      <h3 className="text-xl font-bold leading-snug">
        Fitness made simple.
      </h3>

      {/* Subtitle */}
      <p className="text-sm" style={{ color: "var(--text-sub)" }}>
        No complicated plans. No guessing.
        Just clear daily actions that fit your level.
      </p>

      {/* Bullet-style benefits */}
      <ul className="text-sm space-y-1">
        <li>• A short workout matched to your level</li>
        <li>• A clear goal for today</li>
        <li>• A small win that keeps you motivated</li>
      </ul>

      {/* Emphasis line */}
      <p className="text-sm font-semibold">
        Small steps. Real results.
      </p>

      {/* AI value */}
      <p className="text-sm" style={{ color: "var(--text-sub)" }}>
        Your personal AI coach checks in, keeps you accountable,
        and helps you stay on track when motivation drops.
      </p>
    </div>
  );
}