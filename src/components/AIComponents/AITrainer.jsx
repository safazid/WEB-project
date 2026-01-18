// src/components/AIComponents/AITrainer.jsx
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { buildPrompt } from "./promptBuilder";
import { askAI } from "../../services/aiService";
import WorkoutCard from "./WorkoutCard";
import { calculateCalories } from "../../utils/calculateCalories";
import { useNavigate, useLocation } from "react-router-dom";
import AIChatBox from "./AIChatBox";
import ChallengeCompletedAlert from "../ChallengeComponents/ChallengeCompletedAlert";

/* ================= Helpers ================= */

function getLocalDayKey(date = new Date()) {
  return date.toISOString().split("T")[0];
}

function getISOWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}

function estimateDuration(reps = "") {
  const s = reps.toLowerCase();
  if (s.includes("minute")) return parseInt(s) * 60 || 60;
  if (s.includes("second")) return parseInt(s) || 30;
  if (s.includes("x")) return 45;
  return 40;
}

function estimateMET(name = "") {
  const n = name.toLowerCase();
  if (n.includes("plank")) return 3.8;
  if (n.includes("squat")) return 5;
  if (n.includes("jump") || n.includes("burpee")) return 8;
  if (n.includes("push")) return 4.5;
  if (n.includes("row")) return 4;
  if (n.includes("stretch")) return 2.5;
  return 4;
}

/* ================= Component ================= */

export default function AITrainer() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const feelingParam = params.get("feeling");
  const muscleParam = params.get("muscle");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [userWeight, setUserWeight] = useState(60);
  const [todayFeeling, setTodayFeeling] = useState(null);
  const [targetMuscle, setTargetMuscle] = useState(null);
  const [userData, setUserData] = useState(null);

  const [toast, setToast] = useState(null);
  const [showChallengeAlert, setShowChallengeAlert] = useState(false);
  const [sessionExercises, setSessionExercises] = useState(0);

  useEffect(() => {
    setTodayFeeling(feelingParam);
    setTargetMuscle(muscleParam);

    const runAI = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        const data = snap.data() || {};
        setUserData(data);

        setUserWeight(data?.fitness?.weight || 60);

        const prompt = buildPrompt(data, feelingParam, muscleParam);
        const raw = await askAI(prompt);
      let parsed;

try {
  // 1️⃣ تنظيف أولي
  let clean = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // 2️⃣ ناخد فقط JSON بين { }
  const firstBrace = clean.indexOf("{");
  const lastBrace = clean.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found");
  }

  clean = clean.slice(firstBrace, lastBrace + 1);

  // 3️⃣ parse
  parsed = JSON.parse(clean);
} catch (err) {
  console.error("❌ AI JSON parse failed:", err, raw);

  // 4️⃣ fallback مضمون
  parsed = {
    message: "Let’s do a simple workout today 💪",
    workout: [],
    nutritionTip: "Drink water and eat balanced meals.",
    levelDecision: "stay",
  };
}


        // Auto level update
        const LEVELS = ["Sedentary", "Lightly active", "Moderately active", "Very active"];
        const current = data?.fitness?.activity || "Sedentary";
        let idx = LEVELS.indexOf(current);
        if (idx === -1) idx = 0;

        if (parsed.levelDecision === "increase" && idx < LEVELS.length - 1) idx++;
        if (parsed.levelDecision === "decrease" && idx > 0) idx--;

        const newLevel = LEVELS[idx];
        if (newLevel !== current) {
          await updateDoc(userRef, {
            "fitness.activity": newLevel,
          });
        }

        const fixed = {
          ...parsed,
          workout: parsed.workout.map((w) => ({
            ...w,
            completed: false,
            calories: 0,
            duration: estimateDuration(w.reps),
            met: estimateMET(w.name),
          })),
        };

        setAiData(fixed);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("AI failed.");
        setLoading(false);
      }
    };

    runAI();
  }, [feelingParam, muscleParam]);

  const handleFinishWorkout = async () => {
    try {
      if (!aiData || saving) return;
      setSaving(true);

      const user = auth.currentUser;
      if (!user) return;

      const completedExercises = aiData.workout.filter((w) => w.completed);
      if (completedExercises.length === 0) {
        setToast({ text: "Complete at least one exercise first" });
        setSaving(false);
        return;
      }

      const calories = calculateCalories(
        completedExercises,
        Number(userWeight) || 60
      );

      const todayKey = getLocalDayKey();
      const weekKey = getISOWeekKey();

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const data = snap.data() || {};

      await updateDoc(userRef, {
  totalWorkouts: increment(1),
  [`weeklyWorkouts.${weekKey}`]: increment(1),

  lastFeeling: todayFeeling,
  lastMuscle: targetMuscle,
  lastExercises: aiData.workout.map((w) => w.name),
  lastWorkoutAt: serverTimestamp(),


});


      const dailyCals = data?.dailyStats?.[todayKey]?.calories || 0;
      const dailyEx = data?.dailyStats?.[todayKey]?.exercises || 0;
      const weeklyCals = data?.weeklyCalories?.[weekKey] || 0;

      if (dailyCals + calories >= 300 || dailyEx + sessionExercises >= 5 || weeklyCals + calories >= 2000) {
        setShowChallengeAlert(true);
      }

      setToast({ text: "🔥 Workout finished! Great job 💪" });
      setTimeout(() => navigate("/profile"), 1500);
    } catch (e) {
      console.error(e);
      setToast({ text: "Failed to save workout" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-lg">🤖 Preparing your plan...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  const chatContext = `
Name: ${userData?.name || "User"}
Goal: ${userData?.fitness?.goal || "unknown"}
Activity level: ${userData?.fitness?.activity || "unknown"}
Weight: ${userWeight} kg
Feeling today: ${todayFeeling}
Target muscle: ${targetMuscle}
Last exercises: ${aiData?.workout?.map(w => w.name).join(", ") || "none"}
`;

  return (
  <div
    className="max-w-5xl mx-auto p-6 space-y-8 fade-in"
    style={{ color: "var(--text-main)" }}
  >
    {toast && (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
        <div
          className="px-6 py-3 rounded-xl shadow"
          style={{ background: "var(--primary)", color: "#000" }}
        >
          {toast.text}
        </div>
      </div>
    )}

    <ChallengeCompletedAlert
      open={showChallengeAlert}
      onClose={() => setShowChallengeAlert(false)}
    />

    {/* Header Card */}
    <div
      className="rounded-2xl p-6 shadow"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--primary-soft)",
      }}
    >
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--primary)" }}
      >
        AI Trainer
      </h2>
      <p style={{ color: "var(--text-sub)" }}>{aiData.message}</p>
      <div className="text-sm mt-3" style={{ color: "var(--text-sub)" }}>
        Feeling: <b>{todayFeeling}</b> | Muscle: <b>{targetMuscle}</b>
      </div>
    </div>

    {/* Workout Cards */}
    <div
      className={`grid gap-6 ${
        activeIndex !== null ? "grid-cols-1" : "md:grid-cols-2"
      }`}
    >
      {aiData.workout.map((w, i) => (
        <WorkoutCard
          key={i}
          data={w}
          index={i}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          userWeight={userWeight}
          onComplete={async (burned) => {
            const user = auth.currentUser;
            if (!user) return;

            const todayKey = getLocalDayKey();
            const weekKey = getISOWeekKey();

            await updateDoc(doc(db, "users", user.uid), {
              totalCalories: increment(burned),
              [`dailyStats.${todayKey}.calories`]: increment(burned),
              [`dailyStats.${todayKey}.exercises`]: increment(1),
              [`weeklyCalories.${weekKey}`]: increment(burned),
            });

            setSessionExercises((prev) => prev + 1);

            setAiData((prev) => ({
              ...prev,
              workout: prev.workout.map((ex, idx) =>
                idx === i ? { ...ex, completed: true, calories: burned } : ex
              ),
            }));
          }}
        />
      ))}
    </div>

    {/* Finish Button – BEFORE CHAT */}
    <button
      onClick={handleFinishWorkout}
      disabled={saving}
      className="w-full py-3 rounded-xl font-semibold transition disabled:opacity-60"
      style={{
        background: "linear-gradient(135deg, var(--secondary), var(--primary))",
        color: "white",
        boxShadow: "0 0 20px var(--primary-soft)",
      }}
    >
      {saving ? "Saving workout..." : "✅ Finish Workout"}
    </button>

    {/* Chat AFTER Finish */}
    <AIChatBox context={chatContext} />
  </div>
);


}