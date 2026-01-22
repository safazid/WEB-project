import { useState, useEffect } from "react";
import { estimateBurnedForExercise } from "../../utils/calculateBurned";

/*
  WorkoutCard
  ------------
  Represents a single exercise in the AI workout session.
  Handles:
  - Timer logic
  - Play / Pause / Finish
  - Background music
  - Speech feedback
  - Calorie estimation
*/
export default function WorkoutCard({
  data,
  index,
  activeIndex,
  setActiveIndex,
  userWeight,
  onComplete,
}) {
    // UI & state control
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [done, setDone] = useState(false);

  // Focus logic: only one card can be active at a time
  const isFocused = activeIndex === index;
  const isHidden = activeIndex !== null && activeIndex !== index;

  // Background workout music
  const [bgAudio] = useState(() => new Audio("/music.mp3"));

    /**
   * Uses browser TTS to encourage the user.
   */
  function speak(text) {
    if (!window.speechSynthesis) return;
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    msg.rate = 1;
    msg.pitch = 1.1;
    window.speechSynthesis.speak(msg);
  }

    /**
   * Converts reps text into seconds.
   * Examples:
   *  - "30 seconds" → 30
   *  - "2 minutes" → 120
   */
  function parseTime(reps) {
    if (!reps) return 30;
    const lower = reps.toLowerCase();
    if (lower.includes("second")) return parseInt(lower) || 30;
    if (lower.includes("minute")) return (parseInt(lower) || 1) * 60;
    return 30;
  }

  /**
   * Converts YouTube URLs into embeddable format.
   */
  function toEmbed(url) {
    if (!url) return null;
    if (url.includes("embed")) return url;
    if (url.includes("shorts/")) {
      const id = url.split("shorts/")[1]?.split("?")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    const id = url.split("v=")[1]?.split("&")[0];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  // Countdown timer logic
  useEffect(() => {
    if (!active || paused || timeLeft === null) return;
    if (timeLeft <= 0) return;

    const t = setInterval(() => {
      setTimeLeft((v) => v - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [active, paused, timeLeft]);

  /**
   * Starts the exercise.
   */
  const start = () => {
  setActive(true);
  setDone(false);
  setPaused(false);
  setActiveIndex(index);
  setTimeLeft(parseTime(data.reps));

  bgAudio.loop = true;
  bgAudio.volume = 0.4;
  bgAudio.play();
};

 /**
   * Finishes the exercise and reports calories.
   */
  const finish = () => {
 
  const raw =
  (data.met || 4) * Number(userWeight || 60) * (data.duration / 3600);

const burned = estimateBurnedForExercise(data, userWeight);

  bgAudio.pause();
  bgAudio.currentTime = 0;

  setDone(true);
  setActive(false);
  setPaused(false);
  setActiveIndex(null);

  speak("Great job! You completed this exercise!");
  onComplete(burned);
};

   /**
   * Pauses or resumes the timer and music.
   */
  const togglePause = () => {
  setPaused((p) => {
    if (!p) bgAudio.pause();
    else bgAudio.play();
    return !p;
  });
};

  if (isHidden) return null;

  return (
    <div
      className={`bg-white rounded-2xl shadow transition-all duration-300
      ${isFocused ? "p-10 text-center scale-105" : "p-4"}`}
    >
      <h3 className={`font-bold ${isFocused ? "text-3xl" : "text-lg"}`}>
        {data.name}
      </h3>

      {!isFocused && (
        <>
          <p className="text-sm text-gray-500">{data.reps}</p>
          <p className="text-sm text-gray-700">{data.explanation}</p>

          {data.video && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <iframe
                src={toEmbed(data.video)}
                className="w-full h-48"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={data.name}
              />
            </div>
          )}
        </>
      )}

      {!active && !done && (
        <button
          onClick={start}
          className="mt-4 px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Start Exercise
        </button>
      )}

      {active && (
        <div className="mt-6 space-y-6">
          {data.video && (
            <div className="rounded-xl overflow-hidden">
              <iframe
                src={toEmbed(data.video)}
                className="w-full h-56"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={data.name}
              />
            </div>
          )}

          <div className="text-6xl font-extrabold text-emerald-600">
            {timeLeft}s
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={togglePause}
              className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              {paused ? "Resume" : "Pause"}
            </button>

            {timeLeft <= 0 && (
              <button
                onClick={finish}
                className="px-6 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      )}

      {done && (
        <div className="mt-4 space-y-1 text-center">
          <div className="text-emerald-600 font-semibold">✔ Completed</div>
          {data.calories > 0 && (
            <div className="text-orange-500 font-semibold text-sm">
              🔥 Burned {data.calories} kcal
            </div>
          )}
        </div>
      )}
    </div>
  );
}
