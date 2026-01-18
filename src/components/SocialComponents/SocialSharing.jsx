import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useState } from "react";
import "./SocialSharing.css";

export default function SocialSharing() {
  const [openMenu, setOpenMenu] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const workouts = [
    {
      id: 1,
      title: "Quick Morning Burn",
      date: "2025-02-12",
      goal: "Weight Loss",
      duration: 15,
      desc:
        "Short high-energy session to start the day strong. You completed all rounds successfully!",
      list: [
        "5 min light jog",
        "3 × 12 squats",
        "3 × 10 jumping jacks",
      ],
    },
    {
      id: 2,
      title: "Core Strength Boost",
      date: "2025-02-10",
      goal: "Strength",
      duration: 20,
      desc:
        "Abs and legs focused — you improved your plank time compared to last week!",
      list: [
        "3 × 10 push-ups",
        "3 × 12 lunges each leg",
        "2 × 40s plank",
      ],
    },
    {
      id: 3,
      title: "Evening Mobility & Stretch",
      date: "2025-02-08",
      goal: "Mobility",
      duration: 15,
      desc:
        "Recovery session… helped reduce tightness in hips and lower back.",
      list: [
        "Hip flexor stretches",
        "Hamstring stretches",
        "Child's pose breathing",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <main
        className="pt-28 pb-16 px-6 max-w-4xl mx-auto"
        style={{ background: "var(--bg)", color: "var(--text-main)" }}
      >
        <h2 className="text-3xl font-bold mb-2 text-[var(--secondary)] flex items-center gap-2">
          💜 Social Sharing
        </h2>

        <p className="text-[var(--text-sub)] mb-8 text-sm leading-relaxed">
          Here are some of your recent workouts. Share your progress with friends 💪
        </p>

        <div className="space-y-8">
          {workouts.map((w) => {
            return (
              <div
                key={w.id}
                className="workout-card bg-[var(--card-bg)] border border-[var(--primary-soft)] rounded-2xl shadow-md p-6"
              >
                <h3 className="text-xl font-bold mb-1 text-[var(--primary)]">
                  {w.title}
                </h3>

                <p className="text-[var(--text-sub)] text-sm mb-3">
                  Date:{" "}
                  <span className="text-[var(--text-main)]">{w.date}</span> •
                  Goal:{" "}
                  <span className="text-[var(--secondary)]">{w.goal}</span> •
                  Duration: {w.duration} min
                </p>

                <p className="text-[var(--text-sub)] text-sm mb-3">
                  {w.desc}
                </p>

                <ul className="text-xs text-[var(--text-sub)] mb-4 list-disc ml-5">
                  {w.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    setOpenMenu(openMenu === w.id ? null : w.id)
                  }
                  className="share-btn flex items-center gap-2"
                >
                  <i className="fas fa-share-nodes" /> Share
                </button>

                {openMenu === w.id && (
                  <div className="share-menu mt-4 border border-[var(--primary-soft)] rounded-xl p-4 bg-[var(--bg)] shadow">
                    <p className="font-semibold mb-3 text-[var(--text-main)]">
                      Share this workout:
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {/* EMAIL (NO LINK) */}
                      <button
                        type="button"
                        onClick={() => {
                          const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
                            "I completed a workout 💪"
                          )}&body=${encodeURIComponent(
                            `I just completed a workout!

Workout: ${w.title}
Goal: ${w.goal}
Duration: ${w.duration} minutes

Details:
${w.desc}`
                          )}`;

                          window.open(gmailLink, "_blank");
                        }}
                        className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-center cursor-pointer"
                      >
                        Email
                      </button>

                      {/* COPY TEXT (OPTIONAL) */}
                      <button
                        type="button"
                        onClick={() => {
                          const text = `Workout: ${w.title} | Goal: ${w.goal} | Duration: ${w.duration} min`;
                          navigator.clipboard.writeText(text);
                          setCopiedId(w.id);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className={`px-3 py-2 rounded bg-gray-700 hover:bg-gray-800 ${
                          copiedId === w.id ? "opacity-90" : ""
                        }`}
                      >
                        {copiedId === w.id ? "Copied!" : "Copy Info"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}