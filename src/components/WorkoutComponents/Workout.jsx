import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import "./Workout.css";

import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { getISOWeekKey } from "../../utils/dateHelpers";
import { auth } from "../../firebase";


export default function Workout() {
  const params = new URLSearchParams(window.location.search);

  const playMusic = params.get("music") === "1";
  const [bgAudio] = useState(() => new Audio("/music.mp3"));

  const calories = parseInt(params.get("cal")) || 0;

  useEffect(() => {
  if (!playMusic) return;

  bgAudio.loop = true;
  bgAudio.volume = 0.4;
  bgAudio.play();

  return () => {
    bgAudio.pause();
    bgAudio.currentTime = 0;
  };
}, [playMusic, bgAudio]);
  const duration = parseInt(params.get("duration")) || 1;
  const workoutName = params.get("name") || "Workout Step";

  // ✅ NEW: read dynamic exercises (optional)
  const exParam = params.get("ex");
  const exercises = exParam
    ? decodeURIComponent(exParam).split("|").filter(Boolean)
    : [];

  const [seconds, setSeconds] = useState(duration * 60);
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
  if (seconds === 0) {
    setShowMessage(true);

    const user = auth.currentUser;

    if (user) {
      const today = new Date().toISOString().split("T")[0];
      const weekKey = getISOWeekKey();
      const ref = doc(db, "users", user.uid);

      (async () => {
        try {
         await updateDoc(ref, {
  [`dailyStats.${today}.exercises`]: increment(1),
  [`dailyStats.${today}.calories`]: increment(calories),

  [`weeklyWorkouts.${weekKey}`]: increment(1),
  [`weeklyCalories.${weekKey}`]: increment(calories),
});


          window.dispatchEvent(new Event("stats-updated"));
        } catch (e) {
          console.error("Failed to update workout stats:", e);
        }
      })();
    }

    const timeout = setTimeout(() => {
      navigate("/ai");
    }, 15000);

    return () => clearTimeout(timeout);
  }
}, [seconds, navigate]);




  function format(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function restart() {
    setShowMessage(false);
    setSeconds(duration * 60);
  }

  return (
    <>
      <Navbar />

      <main
        className="pt-32 pb-16 flex flex-col items-center justify-center px-6"
        style={{ background: "var(--bg)", color: "var(--text-main)" }}
      >
        <div
          className="bg-[var(--card-bg)] border border-[var(--primary-soft)]
          rounded-2xl shadow-lg p-8 text-center w-full max-w-md"
        >
          <h2
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--secondary)" }}
          >
            🏋️‍♂️ {workoutName}
          </h2>

          {/* ✅ NEW: show exercises only if provided */}
          {exercises.length > 0 && (
            <div className="text-left mb-6">
              <p className="font-semibold mb-2" style={{ color: "var(--secondary)" }}>
                Today’s Exercises:
              </p>
              <ul className="list-disc ml-6 text-sm text-[var(--text-sub)]">
                {exercises.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-[var(--text-sub)] mb-6 text-sm leading-relaxed">
            Start with a light warm-up: 5 minutes of easy movement.
          </p>

          <div className="flex flex-col items-center gap-2 mb-6">
            <span
              className="text-4xl font-mono font-bold bg-[var(--primary-soft)]
              text-white px-8 py-3 rounded-full"
            >
              {seconds > 0 ? format(seconds) : "✅ Done!"}
            </span>

            <span className="text-xs text-[var(--text-sub)]">
              Timer for this step
            </span>
          </div>

          {showMessage && (
            <div className="mt-4 text-[var(--primary)] font-semibold text-sm">
              Great job! Take a short rest 💪
              <br />
            </div>
          )}

          <button onClick={restart} className="auth-btn mb-4">
            Restart Timer
          </button>

          <button
            onClick={() => navigate("/ai")}
            className="block text-sm font-semibold text-[var(--primary)] hover:underline mx-auto"
          >
            ← Back to Plans
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}