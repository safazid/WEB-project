import { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import Loader from "../loader";

// Profile page that loads the user data from Firestore,
// displays personal info, BMI, and profile photo,
// and allows updating the avatar and editing profile details.
// Redirects to login if no user session is found.

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.warn("❌ Missing userId – redirecting to login");
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "users", userId));

        if (!snap.exists()) {
          navigate("/login");
          return;
        }

        const data = snap.data();
        setProfile(data);
        setImage(data.photo || "/default-avatar.png");
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId, navigate]);

  if (loading) return <Loader />;
  if (!profile) return <p className="text-center mt-20">No profile data</p>;

  const bmi =
    profile.fitness?.height && profile.fitness?.weight
      ? (
          profile.fitness.weight /
          ((profile.fitness.height / 100) ** 2)
        ).toFixed(1)
      : null;

  const uploadPhoto = async (file) => {
    if (!file) return;

    const imageRef = ref(storage, `profiles/${userId}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    await updateDoc(doc(db, "users", userId), { photo: url });

    setImage(url);
    setProfile((prev) => ({ ...prev, photo: url }));
  };

  return (
    <section className="pt-28 px-6 flex justify-center">
      <div className="card max-w-xl w-full text-center">

        <img
          src={image}
          className="w-28 h-28 mx-auto rounded-full border-4 border-[var(--secondary)] object-cover"
        />

        <label className="auth-btn mt-3 inline-block cursor-pointer">
          Change Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => uploadPhoto(e.target.files[0])}
          />
        </label>

        <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
        <p className="text-[var(--text-sub)]">{profile.email}</p>

        {bmi && (
          <p className="mt-2 font-semibold">
            BMI: <span className="text-[var(--secondary)]">{bmi}</span>
          </p>
        )}

        <button
          onClick={() => setShowEdit(true)}
          className="auth-btn mt-6"
        >
          Edit Profile
        </button>

        {showEdit && (
          <EditProfileModal
            profile={profile}
            userId={userId}
            onClose={() => setShowEdit(false)}
            onSave={(updated) => {
              setProfile(updated);
              setShowEdit(false);
            }}
          />
        )}
      </div>
    </section>
  );
}