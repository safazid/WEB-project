// MET values by workout intensity level
const MET_MAP = {
  low: 3,
  medium: 5,
  high: 8,
};

// Calculate total burned calories for a full workout
// based on each exercise's intensity, duration, and user weight.
export function calculateCalories(workout = [], weight = 60) {
    
  let total = 0;

  workout.forEach(ex => {
    const met = MET_MAP[ex.intensity] || 4; // default MET if missing
    const minutes = ex.duration || 5; // default duration
    total += met * weight * (minutes / 60); // standard MET formula
  });

  return Math.round(total);
}