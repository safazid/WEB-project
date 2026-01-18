import { LayoutDashboard, Trophy, Flame } from "lucide-react";

export default function ProfileNavActions({ onDashboard, onChallenges, onMotivation }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <NavBtn icon={<LayoutDashboard size={18} />} title="Dashboard" onClick={onDashboard} />
      <NavBtn icon={<Trophy size={18} />} title="Challenges" onClick={onChallenges} />
      <NavBtn icon={<Flame size={18} />} title="Motivation" onClick={onMotivation} />
    </div>
  );
}

function NavBtn({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        auth-btn
        btn-animate
        py-3
        rounded-xl
        font-medium
        shadow-sm
        opacity-90
        flex items-center justify-center gap-2
      "
    >
      {icon}
      {title}
    </button>
  );
}
