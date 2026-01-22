import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import AboutSection from "./AboutSection";
import TestimonialsSection from "./TestimonialsSection";
import AiCoachSection from "./AiCoachSection";
import Footer from "../layouts/Footer";
import { useEffect } from "react";
import StatsSection from "./StatsSection";
import ReviewsSection from "./ReviewsSection";

/*
  Home Page
  ---------
  This component represents the main landing page of the FitRise application.

  Purpose:
  - Acts as the public homepage for non-authenticated users.
  - Presents the product value, features, and AI capabilities.
  - Resets any previous login state when the page loads.

  Behavior:
  - On mount, clears authentication-related data from localStorage:
      • userId
      • userName
      • isLoggedIn
    This ensures that visiting the home page always starts in a "logged-out" state.

  Structure:
  The page is composed of multiple sections in a top-to-bottom flow:
  1. HeroSection       – Main headline and call-to-action.
  2. FeaturesSection   – Key benefits of the platform.
  3. AboutSection      – Short description of FitRise.
  4. StatsSection      – Platform statistics and achievements.
  5. ReviewsSection    – User feedback and testimonials.
  6. AiCoachSection    – Introduction to the AI trainer.
  7. Footer            – Global footer.
*/
export default function Home() {
  
  // Clear any existing login/session data when entering the home page
  useEffect(() => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("isLoggedIn");
}, []);

  return (
    <>
       {/* Main landing sections */}
      <HeroSection />
      <FeaturesSection />
      <AboutSection />

      {/* Social proof & engagement */}
      <StatsSection />
      <ReviewsSection />

      {/* AI introduction */}
      <AiCoachSection />
           
      {/* Page footer */}
      <Footer />
    </>
  );
}