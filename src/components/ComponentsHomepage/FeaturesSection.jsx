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

function Feature({ title, text }) {
  return (
    <div className="p-6 rounded-xl feature-card">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p>{text}</p>
    </div>
  );
}
