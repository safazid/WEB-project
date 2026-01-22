/*
  ReviewsSection
  --------------
  Displays real-style testimonials from users to build trust and credibility.

  Purpose:
  - Show social proof for the FitRise platform.
  - Highlight how different user levels (Beginner, Intermediate, Advanced)
    benefit from AI-powered workouts and progress tracking.
  - Strengthen emotional connection with visitors.

  Structure:
  - Section title and short intro text.
  - A responsive grid of 3 review cards.
  - Each card shows:
      • Star rating
      • User quote
      • Avatar image
      • Name and fitness level
*/
export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-20 fade-in"
      style={{
        background: "var(--card-bg)",
        borderTop: "1px solid var(--primary-soft)",
        borderBottom: "1px solid var(--primary-soft)"
      }}
    >
      <h2
        className="text-3xl font-bold text-center mb-4"
        style={{ color: "var(--primary)" }}
      >
        What Our Users Say
      </h2>

      <p className="text-center mb-12" style={{ color: "var(--text-sub)" }}>
        Hear from people who improved their fitness journey with FitRise.
      </p>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <Review
          stars="★★★★★"
          text="I always struggled to stay consistent. FitRise’s AI challenges finally helped me keep a daily routine!"
          img="https://randomuser.me/api/portraits/men/32.jpg"
          name="Adam Brooks"
          role="Beginner User"
          color="var(--primary-soft)"
          titleColor="var(--primary)"
        />

        <Review
          stars="★★★★★"
          text="The AI coach keeps me motivated every day. The personalized challenges are exactly what I needed!"
          img="https://randomuser.me/api/portraits/women/65.jpg"
          name="Emily Carter"
          role="Intermediate User"
          color="var(--secondary)"
          titleColor="var(--secondary)"
        />

        <Review
          stars="★★★★☆"
          text="I love how the dashboard shows my progress. Seeing my streaks motivates me to keep going!"
          img="https://randomuser.me/api/portraits/men/75.jpg"
          name="Jason Lee"
          role="Advanced User"
          color="var(--tertiary)"
          titleColor="var(--tertiary)"
        />
      </div>
    </section>
  );
}

/*
  Review Card
  -----------
  A reusable component that renders a single user testimonial.

  Props:
  - stars: string representing rating (e.g. ★★★★★)
  - text: user feedback quote
  - img: avatar image URL
  - name: user name
  - role: fitness level / role
  - color: border and accent color
  - titleColor: color for the user's name
*/
function Review({ stars, text, img, name, role, color, titleColor }) {
  return (
    <div
      className="p-8 rounded-xl shadow-lg transition-all feature-card hover:scale-105 hover:shadow-2xl"
      style={{ background: "var(--card-bg)", border: `1px solid ${color}` }}
    >
      <div className="text-yellow-400 mb-3 text-xl">{stars}</div>
      <p className="mb-4" style={{ color: "var(--text-main)" }}>
        "{text}"
      </p>

      <div className="flex items-center gap-3">
        <img src={img} className="w-10 h-10 rounded-full border" style={{ borderColor: color }} />
        <div>
          <h4 className="font-bold" style={{ color: titleColor }}>{name}</h4>
          <p className="text-sm" style={{ color: "var(--text-sub)" }}>{role}</p>
        </div>
      </div>
    </div>
  );
}