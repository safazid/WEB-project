import StatCard from "./StatCard";

export default function StatsCards({ stats }) {
  const totalWorkouts = stats.totalWorkouts || 0;
  const totalCalories = stats.totalCalories || 0;
  const totalPoints = stats.totalPoints || 0;

  const weeklyGoal = 5;
  const completedWeekly = stats.completedWeekly || 0;

  const currentStreak = stats.currentStreak || 0; // ✅

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard
        label="Total Workouts"
        value={totalWorkouts}
        color="text-green-400"
        note="All time"
      />

      <StatCard
        label="Calories Burned"
        value={totalCalories}
        color="text-orange-400"
        note="Total energy"
      />

      <StatCard
        label="Current Streak"
        value={`${currentStreak} day${currentStreak === 1 ? "" : "s"}`} // ✅
        color="text-purple-400"
        note="Keep it up!"
      />

      <StatCard
        label="Weekly Goal"
        value={`${completedWeekly}/${weeklyGoal}`}
        color="text-pink-400"
        note="This week"
      />
    </div>
  );
}
