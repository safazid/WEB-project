export default function AiCoachSection() {
  return (
    <section
      id="coach"
      className="max-w-7xl mx-auto px-6 py-20 fade-in"
    >
      <h3
        className="text-3xl font-bold text-center mb-12"
        style={{ color: "var(--secondary)" }}
      >
        Meet Your AI Fitness Coach
      </h3>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6" style={{ color: "var(--text-sub)" }}>
          <h4
            className="text-2xl font-semibold"
            style={{ color: "var(--primary)" }}
          >
            Smarter • Adaptive • Motivating
          </h4>

          <p>
            Your AI coach analyzes your progress, adapts workouts,
            sends reminders, and keeps you consistent.
          </p>

          <ul className="space-y-2">
            <li>✔ Adaptive workouts</li>
            <li>✔ Motivation engine</li>
            <li>✔ Habit & streak tracking</li>
          </ul>

      
        </div>
      </div>
    </section>
  );
}
