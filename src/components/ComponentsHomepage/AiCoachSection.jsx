/*
  AiCoachSection
  --------------
  This section presents the AI Fitness Coach feature.

  Purpose:
  - Introduces the AI coach as a core feature of the platform.
  - Explains how the coach adapts workouts, motivates users,
    and helps maintain healthy habits.
  - Highlights the smart, adaptive, and motivational nature
    of the AI system.

  Structure:
  - A centered title at the top.
  - A two-column layout on large screens.
  - Left column contains descriptive text and feature bullets.

  Styling:
  - Uses Tailwind utility classes for layout and spacing.
  - Colors rely on CSS variables (var(--primary), var(--secondary), var(--text-sub)).
  - Includes a fade-in animation for smooth appearance.
*/
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