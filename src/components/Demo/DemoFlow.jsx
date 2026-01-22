import { useState } from "react";
import DemoIntro from "./DemoIntro";
import DemoGoalSelect from "../DemoWorkout/DemoGoalSelect";
import DemoWorkout from "./DemoWorkout";
import DemoFinish from "./DemoFinish";

export default function DemoFlow() {
    // Tracks the current step in the demo flow (1 → 4)
  const [step, setStep] = useState(1);
    // Stores the selected fitness goal from the demo
  const [goal, setGoal] = useState(null);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #e8f6f3 100%)",
      }}
    >
          {/* Step 1: Intro screen */}
      {step === 1 && <DemoIntro onNext={() => setStep(2)} />}

      {/* Step 2: Goal selection */}
      {step === 2 && (
        <DemoGoalSelect
          onSelect={(g) => {
            setGoal(g);
            setStep(3);
          }}
        />
      )}
      {/* Step 3: Demo workout based on selected goal */}
      {step === 3 && (
        <DemoWorkout
          goal={goal}
          onComplete={() => setStep(4)}
        />
      )}
      {/* Step 4: Finish / CTA screen */}
      {step === 4 && <DemoFinish />}
    </div>
  );
}