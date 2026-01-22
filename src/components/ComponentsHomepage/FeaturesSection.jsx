/*
  FeaturesSection
  ----------------
  This section highlights the core advantages of the FitRise platform.

  Purpose:
  - Presents the main reasons why users should choose FitRise.
  - Emphasizes personalization, AI guidance, and progress tracking.
  - Acts as a marketing/overview block on the landing page.

  Structure:
  - A section wrapper with centered title.
  - A responsive grid with three feature cards.
  - Each card is rendered using the reusable <Feature /> component.

  Styling:
  - Uses Tailwind utility classes for layout and spacing.
  - The "feature-card" class allows custom theming/hover effects.
*/
export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <h3 className="text-3xl font-bold text-center mb-12">
        Why Choose FitRise?
      </h3>

      <div className="grid md:grid-cols-3 gap-10">
        <Feature
          title="Personalized Challenges"
          text="AI-generated workouts tailored to your fitness level."
        />
        <Feature
          title="AI Fitness Coach"
          text="Smart motivation and adaptive difficulty."
        />
        <Feature
          title="Track Progress"
          text="Stats, streaks and habit tracking dashboard."
        />
      </div>
    </section>
  );
}
/*
  Feature
  -------
  A reusable card component that displays a single feature.

  Props:
  - title: The feature headline.
  - text: A short description of the feature.

  Purpose:
  - Keeps the FeaturesSection clean and modular.
  - Makes it easy to add or modify features in the future.
*/
function Feature({ title, text }) {
  return (
    <div className="p-6 rounded-xl feature-card">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p>{text}</p>
    </div>
  );
}
