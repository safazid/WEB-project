import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export default function LoginForm({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("A password reset link has been sent to your email.");
    } catch (error) {
      console.error(error);
      alert("Failed to send reset email. Make sure the email is correct.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Session
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", cred.user.uid);

      navigate("/profile");
    } catch (error) {
      console.error("Login error ❌", error);

      if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-2">
        Welcome Back
      </h1>

      <p className="text-center text-gray-400 mb-6 text-lg">
        Continue your journey with{" "}
        <span style={{ color: "var(--secondary)", fontWeight: 600 }}>
          FitAI
        </span>
      </p>

      <form onSubmit={handleLogin}>
        <input
          className="auth-input mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="auth-input mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          className="text-sm text-right cursor-pointer mb-4"
          style={{ color: "var(--secondary)" }}
          onClick={handleForgotPassword}
        >
          Forgot your password?
        </p>

        <button type="submit" className="auth-btn mb-3">
          Login
        </button>
      </form>

      <p className="switch-text text-center">
        Not registered?
        <span className="cursor-pointer" onClick={onRegister}>
          {" "}Create an account
        </span>
      </p>
    </>
  );
}
