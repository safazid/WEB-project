export default function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="py-20 fade-in"
      style={{
        background: "var(--card-bg)",
        borderTop: "1px solid var(--primary-soft)",
        borderBottom: "1px solid var(--primary-soft)",
      }}
    >
      {/* ===== TITLE ===== */}
      <h2
        className="text-3xl font-bold text-center mb-4"
        style={{ color: "var(--primary)" }}
      >
        What Our Users Say
      </h2>

      <p
        className="text-center mb-16"
        style={{ color: "var(--text-sub)" }}
      >
        Hear from people who improved their fitness journey with FitRise.
      </p>

      {/* ===== TESTIMONIALS ONLY ===== */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-xl shadow-lg feature-card">
          <div className="text-yellow-400 mb-3 text-xl">★★★★★</div>
          <p className="mb-4">
            "FitRise helped me stay consistent and motivated every day!"
          </p>
          <span className="font-bold" style={{ color: "var(--primary)" }}>
            — Adam
          </span>
        </div>

        <div className="p-8 rounded-xl shadow-lg feature-card">
          <div className="text-yellow-400 mb-3 text-xl">★★★★★</div>
          <p className="mb-4">
            "The AI coach adapts perfectly to my level."
          </p>
          <span className="font-bold" style={{ color: "var(--secondary)" }}>
            — Emily
          </span>
        </div>

        <div className="p-8 rounded-xl shadow-lg feature-card">
          <div className="text-yellow-400 mb-3 text-xl">★★★★☆</div>
          <p className="mb-4">
            "Best fitness app I’ve ever tried."
          </p>
          <span className="font-bold" style={{ color: "var(--tertiary)" }}>
            — Jason
          </span>
        </div>
      </div>
    </section>
  );
}
