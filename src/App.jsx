import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./components/ComponentsHomepage/Home";
import AuthPage from "./components/UserComponents/AuthPage";
import FitnessSetup from "./components/UserComponents/FitnessSetup";
import ChallengesPage from "./components/ChallengeComponents/ChallengesPage";
import MotivationPage from "./components/MotivationComponents/MotivationPage";
import DashboardPage from "./components/DashboardComponents/DashboardPage";
import ProfilePage from "./components/ProfileComponents/ProfilePage";
import AIFitnessBot from "./components/AIComponents/AIFitnessBot";
import Workout from "./components/WorkoutComponents/Workout";
import SocialSharing from "./components/SocialComponents/SocialSharing";
import WorkoutDemo from "./components/Demo/DemoWorkout";
import AITrainer from "./components/AIComponents/AITrainer";

// Main application router.
// Defines all app routes and wraps them with the MainLayout.
// Each path maps to a specific feature page (home, auth, dashboard, AI, demo, etc.),
// enabling smooth navigation across the FitRise platform.

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/fitness-setup" element={<FitnessSetup />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/motivation" element={<MotivationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ai" element={<AIFitnessBot />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/share" element={<SocialSharing />} />
        <Route path="/demo" element={<WorkoutDemo />} />
       <Route path="/ai-trainer" element={<AITrainer />} />
        <Route path="/ai-coach" element={<AITrainer />} />
 
      </Route>
    </Routes>
  );
}

export default App;