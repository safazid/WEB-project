import { useEffect } from "react";

export default function ChallengeCompletedAlert({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const t = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
        <span className="text-xl">🎉</span>
        <div className="text-sm font-semibold">
          Challenge completed!
          <span className="block text-xs font-normal opacity-90">
            Finish your workout then collect your points 💪
          </span>
        </div>
      </div>
    </div>
  );
}
