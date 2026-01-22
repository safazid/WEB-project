import { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import MotivationText from "./MotivationText";
import SocialIcons from "./SocialIcons";
import AuthFooter from "./AuthFooter";

// Handles the authentication flow for the app.
// Switches between Login and Register forms based on URL hash or user action,
// clears any existing session on load, animates form height changes smoothly,
// and redirects the user after a successful login or registration.
export default function AuthPage() {
  const [mode, setMode] = useState("login"); // login | register
  const wrapperRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = (userId, userName) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/profile");
  };

  useEffect(() => {
    if (location.hash === "#register") {
      setMode("register");
    } else {
      setMode("login");
    }
  }, [location.hash]);
useEffect(() => {
  // 🧹 Clear user session
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("isLoggedIn");
}, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const activeForm = wrapper.querySelector(
      mode === "login" ? "#loginForm" : "#registerForm"
    );

    if (activeForm) {
      wrapper.style.height = activeForm.offsetHeight + "px";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col">

      {/* ===== LOGIN / REGISTER AREA ===== */}
      <div
        className="flex justify-center px-6 pt-32 flex-1 items-start"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <div ref={wrapperRef} className="w-full max-w-md relative">

          {/* LOGIN FORM */}
          <div
            id="loginForm"
            className={`form-wrapper w-full ${
              mode === "login" ? "visible-form" : "hidden-form"
            }`}
          >
            <LoginForm
              onRegister={() => setMode("register")}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>

          {/* REGISTER FORM */}
          <div
            id="registerForm"
            className={`form-wrapper w-full ${
              mode === "register" ? "visible-form" : "hidden-form"
            }`}
          >
            <RegisterForm onLogin={() => setMode("login")} />
          </div>

        </div>
      </div>

      <div className="mt-40">
        <SocialIcons />
      </div>

      <AuthFooter />
    </div>
  );
}