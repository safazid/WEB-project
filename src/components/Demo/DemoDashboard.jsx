import React from "react";
import DemoHeader from "./DemoHeader";
import DemoUserCard from "./DemoUserCard";
import TodayChallenge from "./TodayChallenge";
import FeaturePreview from "./FeaturePreview";
import AICoachCard from "./AICoachCard";

/*
  Demo Dashboard Page
  -------------------
  This page represents a public "preview" version of the FitRise dashboard.
  It allows visitors to explore how the app looks and feels without signing up.

  Purpose:
  - Showcase the main dashboard layout
  - Present example user data and challenges
  - Preview premium features (like the AI Coach)
  - Encourage users to register

  Structure:
  - DemoHeader        → Title and intro for the demo page
  - DemoUserCard      → Mock user profile (name, level, goal)
  - TodayChallenge    → Example daily challenge
  - FeaturePreview    → Highlights locked / premium features
  - AICoachCard       → Preview of the AI Fitness Coach

  Layout:
  - Responsive grid:
    • 1 column on small screens
    • 2 columns on medium screens
    • 3 columns on large screens
*/
export default function DemoDashboard() {
  return (
    <div
      className="min-h-screen pt-32 pb-20"
      style={{
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #e8f6f3 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <DemoHeader />

        <div className="grid gap-6 mt-10
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3">
          <DemoUserCard />
          <TodayChallenge />
          <FeaturePreview />
          <AICoachCard />
        </div>
      </div>
    </div>
  );
}