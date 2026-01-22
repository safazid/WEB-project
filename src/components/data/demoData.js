/*
  Demo Data Configuration
  -----------------------
  This file provides mock data used for demo mode and UI previews.
  It allows the application to display realistic content without
  requiring a real authenticated user or database connection.

  The demo data is useful for:
  - Landing page previews
  - Guest / demo mode
  - UI development and testing
  - Presentations and screenshots

  Objects:
  - demoUser: Simulates a basic user profile.
  - demoChallenges: Example workout challenges shown in demo mode.
  - demoProgress: Example progress metrics for dashboard previews.
*/
export const demoUser = {
  // Display name used in demo mode
  name: "Demo User",
   // Fitness goal shown in the UI
  goal: "Build Strength",
    // User level used for labeling and recommendations
  level: "Intermediate",
};

export const demoChallenges = [
    // Sample challenges displayed in the demo experience
  "15 Push-ups",
  "20 Squats",
  "40s Plank",
];

export const demoProgress = {
   // Example total points
  points: 420,
    // Example calories burned
  calories: 275,
    // Example streak in days
  streak: 6,
};
