// src/components/ChallengeComponents/DailyChallenges.jsx
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db, auth } from "../../firebase";
import ChallengeCard from "./ChallengeCard";
import { onAuthStateChanged } from "firebase/auth";
import ChallengeCompletedAlert from "./ChallengeCompletedAlert";

/* ===== Config ===== */
const dailyChallenges = [
  {
    id: "burn_300",
    icon: "🔥",
    title: "Burn Calories",
    desc: "Burn 300 calories today",
    target: 300,
    points: 50,
    type: "calories",
  },
  {
    id: "do_5_exercises",
    icon: "💪",
    title: "Workout Starter",
    desc: "Complete 5 exercises today",
    target: 5,
    points: 40,
    type: "exercises",
  },
];

const getToday = () => new Date().toISOString().split("T")[0];

export default function DailyChallenges() {
  const [user, setUser] = useState(null);
  const [caloriesToday, setCaloriesToday] = useState(0);
  const [exercisesToday, setExercisesToday] = useState(0);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const today = getToday();

  /* ===== Auth ===== */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  /* ===== Load ===== */
  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data() || {};

      const todayStats = data.dailyStats?.[today] || {
        calories: 0,
        exercises: 0,
      };

      setCaloriesToday(todayStats.calories || 0);
      setExercisesToday(todayStats.exercises || 0);
      setCompleted(data.completedChallenges || {});
      setLoading(false);
    };

    load();
  }, [user, today]);

  /* 🔔 Auto Alert when challenge REACHES target (not collected yet) */
  useEffect(() => {
    dailyChallenges.forEach((c) => {
      const value =
        c.type === "calories" ? caloriesToday : exercisesToday;

      const key = `${c.id}_${today}`;
      const reachedTarget = value >= c.target;
      const isCollected = completed[key] === true;

      if (reachedTarget && !isCollected) {
        setShowAlert(true);
      }
    });
  }, [caloriesToday, exercisesToday, completed, today]);

  if (loading) {
    return <div className="p-6 text-center">Loading challenges...</div>;
  }

  return (
    <div className="space-y-6">
      <ChallengeCompletedAlert
        open={showAlert}
        onClose={() => setShowAlert(false)}
      />

      {dailyChallenges.map((c) => {
        const value =
          c.type === "calories" ? caloriesToday : exercisesToday;

        const key = `${c.id}_${today}`;
        const isCollected = completed[key] === true;
        const reachedTarget = value >= c.target;

        return (
          <ChallengeCard
            key={c.id}
            {...c}
            value={value}
            progress={Math.min((value / c.target) * 100, 100)}
            completed={isCollected}
            canCollect={reachedTarget && !isCollected}
            onCollect={async () => {
              if (!user || !reachedTarget || isCollected) return;

              await updateDoc(doc(db, "users", user.uid), {
                totalPoints: increment(c.points),
                [`completedChallenges.${key}`]: true,
              });

              setCompleted((prev) => ({ ...prev, [key]: true }));
              window.dispatchEvent(new Event("stats-updated"));
            }}
          />
        );
      })}
    </div>
  );
}
