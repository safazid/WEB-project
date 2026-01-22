import { useEffect } from "react";

/*
  ChallengeCompletedAlert
  -----------------------
  A small floating toast that appears when a challenge is completed.

  Behavior:
  - Appears only when `open` is true
  - Automatically disappears after 3 seconds
  - Calls `onClose` to notify the parent

  Props:
  - open: boolean that controls visibility
  - onClose: callback to close the alert
*/
export default function ChallengeCompletedAlert({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    // Auto-close after 3 seconds
    const t = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(t);
  }, [open, onClose]);

 // Do not render anything when closed
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