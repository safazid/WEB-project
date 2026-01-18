// src/components/ChallengeComponents/ChallengeCard.jsx
import ProgressBar from "./ProgressBar";

export default function ChallengeCard({
  icon,
  title,
  desc,
  value,
  target,
  points,
  progress,
  completed,
  canCollect,
  onCollect,
}) {
  return (
    <div className="p-6 rounded-2xl bg-white shadow space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">{desc}</p>

      {/* Progress */}
      <ProgressBar value={progress} />

      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {value} / {target}
        </span>
        <span className="text-emerald-600 font-semibold">
          +{points} pts
        </span>
      </div>

      {/* Actions */}
      {completed ? (
  <div className="text-emerald-600 font-semibold flex items-center gap-2">
    ✓ Completed
  </div>
) : canCollect ? (
  <button
    onClick={onCollect}
    className="w-full py-2 rounded-xl bg-emerald-600 text-white font-bold"
  >
    Collect +{points}
  </button>
) : null}

    </div>
  );
}
