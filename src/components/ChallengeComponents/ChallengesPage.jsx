import { useState } from "react";
import ChallengesHeader from "./ChallengesHeader";
import ChallengesTabs from "./ChallengesTabs";
import DailyChallenges from "./DailyChallenges";
import WeeklyChallenges from "./WeeklyChallenges";
import MotivationBox from "./MotivationBox";
import Footer from "../layouts/Footer";
import ChatBubble from "../layouts/ChatBubble";
import ScoreBox from "./ScoreBox";
import { doc, updateDoc, getDoc,increment } from "firebase/firestore";
import { db } from "../../firebase";
import { getISOWeekKey } from "../../utils/dateHelpers";

/*
  ChallengesPage
  --------------
  Main container for the Challenges feature.

  Responsibilities:
  - Switch between Daily and Weekly challenges
  - Handle challenge completion logic
  - Update user stats in Firestore
  - Prevent duplicate collection (daily / weekly)
  - Render all related UI components

  This page coordinates:
  - Tabs (Daily / Weekly)
  - Challenge lists
  - User points & progress updates
*/
export default function ChallengesPage() {

  // Active tab: "daily" | "weekly"
  const [activeTab, setActiveTab] = useState("daily");

  // Optional motivational section toggle
  const [showMotivation, setShowMotivation] = useState(false);

    /**
   * Called when a challenge is completed and the user
   * attempts to collect its reward.
   *
   * - Prevents duplicate collection
   * - Updates Firestore with points, calories, and workouts
   * - Handles both daily and weekly challenges
   */
  const completeChallenge = async (
  id,
  points,
  calories,
  isWeekly = false
) => {
  console.log("🟡 completeChallenge called", {
    id,
    points,
    calories,
    isWeekly,
  });

  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const today = new Date().toISOString().split("T")[0];
  const weekKey = getISOWeekKey();

  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  const d = snap.data() || {};

  // DAILY: prevent multiple collections on the same day
  if (!isWeekly) {
    const userDaily =
      JSON.parse(localStorage.getItem("userDaily")) || {};
    if (userDaily[id] === today) {
      console.log("⛔ DAILY already collected");
      return;
    }

    userDaily[id] = today;
    localStorage.setItem(
      "userDaily",
      JSON.stringify(userDaily)
    );
  }
  // WEEKLY: prevent duplicate collection in the same week
  const completedWeeklyKey = `${id}_${weekKey}`;

  if (isWeekly && d.completedWeekly?.[completedWeeklyKey]) {
    console.log("⛔ WEEKLY already collected (firestore)");
    return;
  }
    // Update user stats in Firestore
  await updateDoc(ref, {
    totalPoints: increment(points),
    totalCalories: increment(calories),
    totalWorkouts: increment(1),
    ...(isWeekly && {
      [`completedWeekly.${completedWeeklyKey}`]: true,
    }),
  });

  console.log("✅ WEEKLY collected successfully");

  // Notify other components (e.g., ScoreBox) to refresh
  window.dispatchEvent(new Event("stats-updated"));
};


  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-32 fade-in">
        <ChallengesHeader />
        <ScoreBox />

        <ChallengesTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "daily" && (
          <DailyChallenges onComplete={completeChallenge} />
        )}

        {activeTab === "weekly" && (
          <WeeklyChallenges onComplete={completeChallenge} />
        )}

        <MotivationBox show={showMotivation} />
      </section>

      <Footer />
      <ChatBubble />
    </>
  );
}