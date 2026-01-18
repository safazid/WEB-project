import { useState } from "react";
import DemoIntro from "./DemoIntro";
import DemoGoalSelect from "../DemoWorkout/DemoGoalSelect";
import DemoWorkout from "./DemoWorkout";
import DemoFinish from "./DemoFinish";

export default function DemoFlow() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState(null);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #e8f6f3 100%)",
      }}
    >
      {step === 1 && <DemoIntro onNext={() => setStep(2)} />}

      {step === 2 && (
        <DemoGoalSelect
          onSelect={(g) => {
            setGoal(g);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <DemoWorkout
          goal={goal}
          onComplete={() => setStep(4)}
        />
      )}

      {step === 4 && <DemoFinish />}
    </div>
  );
}
