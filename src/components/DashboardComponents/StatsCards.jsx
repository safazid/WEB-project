import StatCard from "./StatCard";

/*
  StatsCards
  ----------
  A container component that groups and displays the main
  user statistics on the dashboard using multiple StatCard components.

  Props:
  - stats (object): Aggregated user statistics fetched from Firestore.
    Expected fields:
      • totalWorkouts (number)
      • totalCalories (number)
      • totalPoints (number)
      • completedWeekly (number)
      • currentStreak (number)

  Purpose:
  - Present the user's key performance indicators in a compact grid.
  - Provide a quick overview of overall progress and habits.
  - Serve as the main "summary row" of the dashboard.

  Displayed Metrics:
  1. Total Workouts  → All-time workout count.
  2. Calories Burned → Total calories burned across all sessions.
  3. Current Streak  → Number of consecutive active days.
  4. Weekly Goal     → Progress toward the weekly workout target.

  Behavior:
  - Safely falls back to 0 when any stat is missing.
  - Formats the streak value grammatically ("1 day" vs "X days").
  - Defines a fixed weekly goal (default: 5 workouts).

  UI Features:
  - Responsive grid layout:
      • 1 column on mobile
      • 2 columns on small screens
      • 4 columns on large screens
  - Each metric is rendered using the reusable StatCard component.
  - Color-coded values for better visual distinction.

  UX Benefits:
  - Gives users an immediate snapshot of their fitness progress.
  - Reinforces habits through visible streak tracking.
  - Encourages goal completion by clearly showing weekly progress.
  - Keeps the dashboard clean, structured, and motivating.
*/
export default function StatsCards({ stats }) {
  const totalWorkouts = stats.totalWorkouts || 0;
  const totalCalories = stats.totalCalories || 0;
  const totalPoints = stats.totalPoints || 0;

  const weeklyGoal = 5;
  const completedWeekly = stats.completedWeekly || 0;

  const currentStreak = stats.currentStreak || 0; 

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
        value={`${currentStreak} day${currentStreak === 1 ? "" : "s"}`} 
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
