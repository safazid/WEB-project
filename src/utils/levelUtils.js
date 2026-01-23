/**
 * Calculates the user's current level and progress based on total points (XP).
 *
 * The leveling system works in tiers:
 * - Level 1 starts with a requirement of 100 XP.
 * - Each next level increases the required XP by 40%.
 * - Points are consumed level by level until the remaining XP
 *   is not enough to advance further.
 *
 * @param {number} points - Total accumulated XP (default: 0)
 * @returns {Object} An object containing:
 *  - level: The current user level
 *  - progressPercent: Progress toward the next level (0–100)
 *  - currentXP: Remaining XP within the current level
 *  - requiredXP: XP needed to reach the next level
 */
export function getLevelProgress(totalPoints = 0) {
  let level = 1;
  let needed = 100;
  let remaining = totalPoints;

  while (remaining >= needed) {
    remaining -= needed;
    needed = Math.floor(needed * 1.4);
    level++;
  }

  return {
    level,
    progressPercent: Math.round((remaining / needed) * 100),
    currentXP: remaining,
    requiredXP: needed,
  };
}