import React from "react";

import DemoHeader from "./DemoHeader";
import DemoUserCard from "./DemoUserCard";
import TodayChallenge from "./TodayChallenge";
import FeaturePreview from "./FeaturePreview";
import AICoachCard from "./AICoachCard";

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

