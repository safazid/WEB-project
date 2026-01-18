
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

    // ✅ نضمن الاسم والإيميل دايمًا
    setProfile({
      name: data.name || "User",
      email: data.email || "",
      ...data,
    });
  };

  load();
}, [userId, navigate]);


  if (!profile) return <Loader />;

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

          <ProfileAchievements progress={70} />
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