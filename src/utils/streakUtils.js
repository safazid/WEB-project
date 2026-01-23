/**
 * Calculates the user's current weekly streak based on daily activity.
 *
 * The function scans the last 30 days (including today) and counts how many
 * days the user completed at least one exercise.
 *
 * Rules:
 * - A day is considered "active" if `day.exercises > 0`.
 * - The streak increases for every active day found.
 * - Up to 2 missed days in a row are allowed.
 * - If more than 2 consecutive days are missed, the streak stops.
 *
 * @param {Object} dailyStats - An object keyed by date (YYYY-MM-DD),
 * where each value contains daily activity data, e.g.:
 * {
 *   "2026-01-20": { exercises: 2 },
 *   "2026-01-21": { exercises: 0 }
 * }
 *
 * @returns {number} The current streak count (number of active days)
 */
export function calculateWeeklyStreak(dailyStats) {
  if (!dailyStats) return 0;

  let streak = 0;
  let missedDays = 0;

  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);

    const day = dailyStats[key];

    console.log("Checking:", key, day);

    if (day && day.exercises > 0) {
      streak++;
      missedDays = 0;
      continue;
    }

    missedDays++;

    if (missedDays > 2) break;
  }

  return streak;
}
