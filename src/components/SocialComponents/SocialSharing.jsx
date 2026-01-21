import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import "./SocialSharing.css";
import { doc, getDoc } from "firebase/firestore";
import { WORKOUT_LIBRARY } from "../AIComponents/workoutLibrary";

export default function SocialSharing() {
  const [openMenu, setOpenMenu] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const formatDuration = (d) => {
    if (!d) return "";
    if (typeof d === "string") {
      if (d.includes("second") || d.includes("rep")) return d;
    }
    return `${d} min`;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const data = snap.data() || {};
      const today = new Date().toISOString().slice(0, 10);

      const list = (data.lastExercises || []).map((name, i) => {
        const full = WORKOUT_LIBRARY.find((w) => w.name === name);

        return {
          id: i,
          title: name,
          date: today,
          goal: full?.muscle || "General",
          duration: full?.reps || "",
          desc: full?.explanation || "",
          list: [],
          video: full?.video || "",
        };
      });

      setWorkouts(list);
    });

    return () => unsubscribe();
  }, []);

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
          {workouts.map((w) => (
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
                Duration: {formatDuration(w.duration)}
              </p>

              <p className="text-[var(--text-sub)] text-sm mb-3">
                {w.desc}
              </p>

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
                    {/* EMAIL */}
                    <button
                      type="button"
                      onClick={() => {
                        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
                          "I completed a workout 💪"
                        )}&body=${encodeURIComponent(
                          `I just completed a workout!

Workout: ${w.title}
Goal: ${w.goal}
Duration: ${formatDuration(w.duration)}

Details:
${w.desc}`
                        )}`;

                        window.open(gmailLink, "_blank");
                      }}
                      className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-center cursor-pointer"
                    >
                      Email
                    </button>

                    {/* COPY INFO */}
                    <button
                      type="button"
                      onClick={() => {
                        const text = `Workout: ${w.title} | Goal: ${w.goal} | Duration: ${formatDuration(
                          w.duration
                        )}`;
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
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
