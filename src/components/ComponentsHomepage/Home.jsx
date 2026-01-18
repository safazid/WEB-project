import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import AboutSection from "./AboutSection";
import TestimonialsSection from "./TestimonialsSection";
import AiCoachSection from "./AiCoachSection";
import Footer from "../layouts/Footer";
import { useEffect } from "react";

import StatsSection from "./StatsSection";
import ReviewsSection from "./ReviewsSection";

export default function Home() {
  useEffect(() => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("isLoggedIn");
}, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />

      <StatsSection />
      <ReviewsSection />

      <AiCoachSection />
      <Footer />
    </>
  );
}

