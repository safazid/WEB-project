import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import PersonalInfoCard from "./cards/PersonalInfoCard";
import FitnessInfoCard from "./cards/FitnessInfoCard";
import PasswordCard from "./cards/PasswordCard";
import "./profile.css";

// Edit Profile Modal
// Allows the user to update personal info, fitness details, and password.
// Saves changes to Firestore and updates the local profile state.
export default function EditProfileModal({ profile, userId, onClose, onSave }) {
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    height: profile.fitness?.height || "",
    weight: profile.fitness?.weight || "",
    goal: profile.fitness?.goal || "",
    activity: profile.fitness?.activity || "",
    dob: profile.fitness?.dob || "",
  });

  const [newPassword, setNewPassword] = useState("");
  const handleSave = async () => {
  const ref = doc(db, "users", userId);

  const updatedProfile = {
    ...profile,
    name: form.name,
    email: form.email,
    fitness: {
      height: Number(form.height),
      weight: Number(form.weight),
      goal: form.goal,
      activity: form.activity,
      dob: form.dob,
    },
  };

  await updateDoc(ref, {
    name: updatedProfile.name,
    email: updatedProfile.email,
    fitness: updatedProfile.fitness,
    ...(newPassword && { password: newPassword }),
  });

  onSave(updatedProfile); 
  onClose();
};


  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-3xl rounded-3xl shadow-2xl border overflow-hidden profile-modal">

      {/* Header */}
      <div className="px-8 py-6 bg-[rgba(0,128,128,0.08)] border-b border-[rgba(0,128,128,0.20)]">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Edit Profile
        </h2>
        <p className="text-center text-sm text-gray-600 mt-1">
          Update your personal & fitness information
        </p>

        {/* Scroll hint */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 text-xs text-gray-600 bg-white/70 px-3 py-1 rounded-full border border-[rgba(0,128,128,0.18)]">
            <span>Scroll down</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* Body (scrollable) */}
      <div className="px-8 py-6 space-y-6 max-h-[65vh] overflow-y-auto">
        {/* Card 1 */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 bg-[rgba(0,128,128,0.06)] rounded-t-2xl">
            <h3 className="font-semibold text-[rgba(0,128,128,1)]">
              Personal Information
            </h3>
          </div>
          <div className="p-5">
            <PersonalInfoCard form={form} setForm={setForm} />
          </div>
        </section>

        {/* Card 2 */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 bg-[rgba(0,128,128,0.06)] rounded-t-2xl">
            <h3 className="font-semibold text-[rgba(0,128,128,1)]">
              Fitness Details
            </h3>
          </div>
          <div className="p-5">
            <FitnessInfoCard form={form} setForm={setForm} />
          </div>
        </section>

        {/* Card 3 */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 bg-[rgba(0,128,128,0.06)] rounded-t-2xl">
            <h3 className="font-semibold text-[rgba(0,128,128,1)]">
              Security
            </h3>
          </div>
          <div className="p-5">
            <PasswordCard newPassword={newPassword} setNewPassword={setNewPassword} />
          </div>
        </section>
      </div>

      {/* Footer  */}
      <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="
            px-7 py-2.5 rounded-xl
            bg-[rgba(0,128,128,1)]
            text-white font-semibold
            shadow-md
            hover:brightness-110 hover:scale-[1.02]
            transition
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
);
}