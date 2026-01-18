/*import { User, Bot, Share2 } from "lucide-react";

export default function ProfileActions({ onEdit, onBot, onSocial }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      <ActionCard icon={<User size={18} />} title="Edit Profile" onClick={onEdit} />
      <ActionCard icon={<Bot size={18} />} title="AI Fitness Bot" onClick={onBot} />
      <ActionCard icon={<Share2 size={18} />} title="Social Sharing" onClick={onSocial} />
    </div>
  );
}

function ActionCard({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        auth-btn
        btn-animate
        py-3
        rounded-xl
        font-semibold
        shadow
        flex items-center justify-center gap-2
      "
    >
      {icon}
      {title}
    </button>
  );
}*/
import { User, Bot, Share2 } from "lucide-react";

export default function ProfileActions({
  onEdit,
  onBot,
  onSocial,
  showWorkoutHint, // ➕ جديد
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      <ActionCard
        icon={<User size={18} />}
        title="Edit Profile"
        onClick={onEdit}
      />

      {/* AI Fitness Bot + Tooltip */}
      <div className="relative">
        {showWorkoutHint && (
          <div
            className="
  absolute
  -top-14
  left-1/2
  -translate-x-1/2
  bg-black
  text-white
  text-sm
  px-2
  py-3
  rounded-xl
  shadow-xl
  z-50
  text-center
  whitespace-nowrap
"

          >
            🔥 Start your first workout with your AI coach
            <div
              className="
                absolute
                bottom-[-6px]
                left-1/2
                -translate-x-1/2
                w-3
                h-3
                bg-black
                rotate-45
              "
            />
          </div>
        )}

        <ActionCard
          icon={<Bot size={18} />}
          title="AI Fitness Bot"
          onClick={onBot}
        />
      </div>

      <ActionCard
        icon={<Share2 size={18} />}
        title="Social Sharing"
        onClick={onSocial}
      />
    </div>
  );
}

function ActionCard({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        auth-btn
        btn-animate
        py-3
        rounded-xl
        font-semibold
        shadow
        flex items-center justify-center gap-2
      "
    >
      {icon}
      {title}
    </button>
  );
}
