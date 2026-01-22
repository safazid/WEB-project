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
  relative p-6 rounded-2xl shadow-lg border
  bg-gradient-to-br 
  from-yellow-100 to-pink-100
  dark:from-[#2a2433] dark:to-[#1e293b]
  border-yellow-300/40 dark:border-purple-500/30
  text-gray-900 dark:text-gray-100
  transition-all duration-300
  ${unlocked && !opened ? "cursor-pointer hover:scale-105 animate-pulse" : "opacity-70"}
`}

    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🎁</span>
        <h3 className="text-lg font-bold">Daily Mystery Box</h3>
      </div>

<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {opened
          ? "You already opened today’s box 🎉"
          : unlocked
          ? "Tap the box to reveal your reward!"
          : "Complete 1 workout today to unlock"}
      </p>

      <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: unlocked ? "100%" : "0%" }}
        />
      </div>

<div className="text-sm text-gray-700 dark:text-gray-300">
        {unlocked ? "1 / 1" : "0 / 1"}
      </div>

      {!opened && unlocked && (
        <div className="absolute top-3 right-3 text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">
          OPEN
        </div>
      )}
    </div>
  );
}

/*
  DailyChallenges
  ----------------
  Displays and manages the user's daily challenges.

  Features:
  - Tracks daily calories and completed exercises
  - Shows progress for each daily challenge
  - Allows collecting rewards when targets are reached
  - Displays an automatic alert when a challenge is completed
  - Includes a "Mystery Box" reward unlocked after 1 workout

  Data Sources:
  - Firebase Auth: to identify the current user
  - Firestore (users collection):
      - dailyStats[YYYY-MM-DD].calories
      - dailyStats[YYYY-MM-DD].exercises
      - completedChallenges

  Behavior:
  - Loads today's stats on login
  - Updates progress in real time
  - Prevents collecting the same challenge twice
  - Sends a "stats-updated" event after any reward
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
  // Listen for auth changes and keep the current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  /* ===== Load ===== */
  // Load today's stats from Firestore
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
// Show an alert when a challenge reaches its target but is not yet collected
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
