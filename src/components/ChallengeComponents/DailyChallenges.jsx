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

function MysteryBoxCard({ unlocked, opened, onOpen }) {
  return (
    <div
      onClick={() => unlocked && !opened && onOpen()}
      className={`
        relative p-6 rounded-2xl border transition-all
        ${unlocked && !opened 
          ? "cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_25px_color-mix(in_srgb,var(--primary)_45%,transparent)]" 
          : "opacity-70"}
      `}
      style={{
        background: "color-mix(in srgb, var(--primary) 18%, transparent)",
        backdropFilter: "blur(8px)",
        borderColor: "var(--primary-soft)",
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl drop-shadow">🎁</span>
        <h3 className="text-lg font-bold tracking-wide text-[var(--primary)]">
          Daily Mystery Box
        </h3>
      </div>

      <p className="text-sm mb-4 opacity-80">
        {opened
          ? "You already opened today’s box 🎉"
          : unlocked
          ? "Tap the box to reveal your reward!"
          : "Complete 1 workout today to unlock"}
      </p>

      {/* Progress Bar */}
      <div
        className="w-full h-3 rounded-full overflow-hidden mb-2"
        style={{
          background: "color-mix(in srgb, var(--primary) 25%, transparent)",
        }}
      >
        <div
          className="h-full transition-all duration-500"
          style={{
            width: unlocked ? "100%" : "0%",
            background: "var(--primary)",
            boxShadow:
              "0 0 12px color-mix(in srgb, var(--primary) 60%, transparent)",
          }}
        />
      </div>

      <div className="text-sm font-semibold opacity-80">
        {unlocked ? "1 / 1" : "0 / 1"}
      </div>

      {!opened && unlocked && (
        <div
          className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full"
          style={{
            background: "var(--primary)",
            color: "#000",
            boxShadow: "0 0 12px var(--primary-soft)",
          }}
        >
          OPEN 🎉
        </div>
      )}
    </div>
  );
}


/*
  DailyChallenges
  ----------------
  Displays and manages the user's daily challenges.
*/
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

  /* 🔔 Auto Alert */
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

  const mysteryKey = `mystery_${today}`;
  const mysteryOpened = completed[mysteryKey] === true;
  const canOpenMystery = exercisesToday >= 1 && !mysteryOpened;

  return (
    <div className="space-y-6">
      <ChallengeCompletedAlert
        open={showAlert}
        onClose={() => setShowAlert(false)}
      />

      {/* 🎁 Mystery Box */}
      <MysteryBoxCard
        unlocked={exercisesToday >= 1}
        opened={mysteryOpened}
        onOpen={async () => {
          if (!user || mysteryOpened || exercisesToday < 1) return;

          const reward = Math.floor(Math.random() * 21) + 10;

          await updateDoc(doc(db, "users", user.uid), {
            totalPoints: increment(reward),
            [`completedChallenges.${mysteryKey}`]: true,
          });

          alert(`🎉 You found ${reward} bonus points!`);

          setCompleted((prev) => ({ ...prev, [mysteryKey]: true }));
          window.dispatchEvent(new Event("stats-updated"));
        }}
      />

      {/* 🎯 Daily Challenges */}
      {dailyChallenges.map((c) => {
        const value =
          c.type === "calories" ? caloriesToday : exercisesToday;

        const key = `${c.id}_${today}`;
        const isCollected = completed[key] === true;
        const reachedTarget = value >= c.target;

        return (
          <div
            key={c.id}
            className={`
              rounded-2xl transition-all
              ${reachedTarget && !isCollected 
                ? "shadow-[0_0_20px_rgba(16,185,129,0.35)] border border-emerald-400"
                : ""}
            `}
          >
            <ChallengeCard
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
          </div>
        );
      })}
    </div>
  );
}
