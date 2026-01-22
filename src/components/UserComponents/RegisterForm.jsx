import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CaptchaSwitcher from "./Captcha/CaptchaSwitcher";
import MotivationText from "./MotivationText";
// 🔐 Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Handles user registration with form validation, CAPTCHA verification,
// and Firebase Authentication. On success, redirects the user to the
// fitness setup flow with basic profile data.
export default function RegisterForm({ onLogin }) {
  const captchaRef = useRef(null);
  const [captchaOk, setCaptchaOk] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState(
    location.state?.registerData || {
      name: "",
      email: "",
      password: "",
      confirm: "",
    }
  );

  /* ===== handle input ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /* ===== validation ===== */
  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = "Full name is required";

    if (!form.email.trim()) errs.email = "Email is required";
    else if (!form.email.includes("@"))
      errs.email = "Invalid email address";

    if (!form.password)
      errs.password = "Password is required";
    else if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters";

    if (form.password !== form.confirm)
      errs.confirm = "Passwords do not match";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ===== submit ===== */
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  if (!captchaRef.current?.verifyCaptcha()) {
    alert("Please solve the CAPTCHA correctly");
    return;
  }

  setSubmitting(true);

  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    const uid = cred.user.uid;

    navigate("/fitness-setup", {
      state: {
        registerData: {
          uid,
          name: form.name,
          email: form.email,
        },
      },
    });

  } catch (error) {
    console.error("Register error ❌", error);

    if (error.code === "auth/email-already-in-use") {
      alert("This email is already registered");
    } else {
      alert("Registration failed");
    }
  } finally {
    setSubmitting(false);
  }
};


   return (
    <form
      id="registerForm"
      onSubmit={handleSubmit}
      className="form-wrapper w-full"
    >
      <h2 className="text-3xl font-bold text-center mb-2">
        Create Your Account
      </h2>

      <p className="text-center text-gray-400 mb-3 text-lg">
        Join{" "}
        <span style={{ color: "var(--secondary)", fontWeight: 600 }}>
          FitAI
        </span>{" "}
        and start your fitness journey today
      </p>

      {/* Full Name */}
      <div className="mb-4 mt-4 text-[var(--secondary)]">
        <label className="block font-medium mb-1">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="your name"
          className="auth-input"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4 text-[var(--secondary)]">
        <label className="block font-medium mb-1">Email Address</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="you@example.com"
          className="auth-input"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4 text-[var(--secondary)]">
        <label className="block font-medium mb-1">Password</label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="••••••••"
          className="auth-input"
        />
        <p className="text-sm text-gray-400 mt-1">
          Password must be at least 8 characters long
        </p>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label className="block font-medium mb-1 text-[var(--secondary)]">
          Confirm Password
        </label>
        <input
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
          type="password"
          placeholder="••••••••"
          className="auth-input"
        />
        {errors.confirm && (
          <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>
        )}
      </div>

      {/* CAPTCHA */}
      <div className="mb-6">
        <CaptchaSwitcher ref={captchaRef} onResult={setCaptchaOk} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="auth-btn mt-4 w-full"
      >
        {submitting ? "Creating Account..." : "Create Account"}
      </button>

      {/* Switch to Login */}
      <p className="text-center text-[var(--secondary)] mt-4">
        Already have an account?{" "}
        <span
          className="text-[var(--secondary)] cursor-pointer"
          onClick={onLogin}
        >
          Sign in
        </span>
      </p>

      <MotivationText />
    </form>
  );
}