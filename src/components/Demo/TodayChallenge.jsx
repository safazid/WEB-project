export default function TodayChallenge() {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--primary-soft)",
      }}
    >
          {/* Card title */}
      <h3 className="text-xl font-bold mb-3">
        Daily Challenges
      </h3>

      {/* List of main challenge features */}
      <ul className="space-y-2 text-sm mb-4">
        <li>🏋️ Personalized workouts</li>
        <li>🔥 Daily & weekly goals</li>
        <li>🏅 Achievement badges</li>
      </ul>

      {/* Short description */}
      <p className="text-sm" style={{ color: "var(--text-sub)" }}>
        Challenges adapt to your fitness level and goals.
      </p>
    </div>
  );
}