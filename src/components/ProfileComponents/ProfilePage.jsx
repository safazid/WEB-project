import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ProfileHeader from "./ProfileHeader";
import ProfileActions from "./ProfileActions";
import ProfileAchievements from "./ProfileAchievements";
import ProfileNavActions from "./ProfileNavActions";
import EditProfileModal from "./EditProfileModal";
import Loader from "./loader";
import ChatBubble from "../layouts/ChatBubble";
import { getLevelProgress } from "../../utils/levelUtils";

export default function ProfilePage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showWorkoutHint, setShowWorkoutHint] = useState(false);

  useEffect(() => { 
    if (!userId) return;

    const seenHint = localStorage.getItem(`seenWorkoutHint_${userId}`);
    if (!seenHint) {
      setShowWorkoutHint(true);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const load = async () => {
      const snap = await getDoc(doc(db, "users", userId));

      if (!snap.exists()) {
        console.warn("No user doc for id:", userId);
        navigate("/login");
        return;
      }

      const data = snap.data();
    const levelData = getLevelProgress(data.totalPoints || 0);

      setProfile({
        name: data.name || "User",
        email: data.email || "",
        levelData,
        ...data,
      });
    };

    load();
  }, [userId, navigate]);

  if (!profile) return <Loader />;

  // ✅ unified level calculation
const levelData = profile.levelData;

  return (
    <section className="pt-28 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl border border-[var(--primary-soft)] p-8"
          style={{ background: "var(--card-bg)", boxShadow: "var(--card-shadow)" }}
        >
          <ProfileHeader profile={profile} />

          <hr className="my-8 border-[var(--primary)]" />

          <ProfileActions
            onEdit={() => setShowEdit(true)} 
            onBot={() => {
              localStorage.setItem(`seenWorkoutHint_${userId}`, "true"); 
              setShowWorkoutHint(false);
              navigate("/ai");
            }}
            onSocial={() => navigate("/share")}
            showWorkoutHint={showWorkoutHint}
          />

          <ProfileNavActions
            onDashboard={() => navigate("/dashboard")}
            onChallenges={() => navigate("/challenges")}
            onMotivation={() => navigate("/motivation")}
          />

          <hr className="my-8 border-[var(--primary-soft)]" />

          {/* ===== LEVEL (MOVED HERE — SAME STYLE AS OLD TOP CARD) ===== */}
        <div
  className="mb-8 p-4 rounded-xl border border-[var(--primary-soft)] transition-all"
  style={{
    background: "color-mix(in srgb, var(--primary) 18%, transparent)",
    backdropFilter: "blur(6px)",
  }}
>
  <div className="flex justify-between items-center mb-2">
    <p className="font-bold text-[var(--primary)]">
      Level {levelData.level}
    </p>
    <p className="text-xs opacity-70">
      {levelData.currentXP} / {levelData.requiredXP} XP
    </p>
  </div>

  <div className="w-full h-2 rounded overflow-hidden"
       style={{ background: "color-mix(in srgb, var(--primary) 25%, transparent)" }}>
    <div
      className="h-2 transition-all duration-500"
      style={{
        width: `${levelData.progressPercent}%`,
        background: "var(--primary)"
      }}
    />
  </div>
</div>


        </div>
      </div>

      {showEdit && (
        <EditProfileModal
          profile={profile}
          userId={userId}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => setProfile(updated)}
        />
      )}

      <ChatBubble
        context={`
Name: ${profile.name}
Goal: ${profile.fitness?.goal || "unknown"}
Activity level: ${profile.fitness?.activity || "unknown"}
`}
      />
    </section>
  );
}