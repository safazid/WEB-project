export default function FeaturePreview() {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--primary-soft)",
      }}
    >
      <h3 className="text-xl font-bold mb-3">
        Track Your Progress
      </h3>

      {/* Placeholder Image */}
      <div
        className="h-32 rounded-lg flex items-center justify-center text-sm mb-4"
        style={{
          background: "linear-gradient(135deg, #e8f6f3, #f5f7fa)",
          color: "var(--text-sub)",
        }}
      >
        Progress charts & stats preview
      </div>

      <p className="text-sm" style={{ color: "var(--text-sub)" }}>
        Visualize your workouts, calories, streaks and achievements
        in one personalized dashboard.
      </p>
    </div>
  );
}
