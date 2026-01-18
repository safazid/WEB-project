export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 fade-in">
      <div className="grid md:grid-cols-3 gap-8 text-center">

        {/* USERS */}
        <div
          className="p-8 rounded-xl shadow-lg transition-all feature-card hover:scale-105 hover:shadow-2xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--primary-soft)",
          }}
        >
          <h3
            className="text-4xl font-extrabold mb-2"
            style={{ color: "var(--primary)" }}
          >
            12,800+
          </h3>
          <p style={{ color: "var(--text-sub)" }}>Active Users</p>
        </div>

        {/* CHALLENGES */}
        <div
          className="p-8 rounded-xl shadow-lg transition-all feature-card hover:scale-105 hover:shadow-2xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--secondary)",
          }}
        >
          <h3
            className="text-4xl font-extrabold mb-2"
            style={{ color: "var(--secondary)" }}
          >
            520K+
          </h3>
          <p style={{ color: "var(--text-sub)" }}>
            Challenges Completed
          </p>
        </div>

        {/* SUCCESS */}
        <div
          className="p-8 rounded-xl shadow-lg transition-all feature-card hover:scale-105 hover:shadow-2xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--tertiary)",
          }}
        >
          <h3
            className="text-4xl font-extrabold mb-2"
            style={{ color: "var(--tertiary)" }}
          >
            93%
          </h3>
          <p style={{ color: "var(--text-sub)" }}>Success Rate</p>
        </div>

      </div>
    </section>
  );
}
