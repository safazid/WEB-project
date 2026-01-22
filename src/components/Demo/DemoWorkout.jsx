import { useState } from "react";
import { demoExercises } from "../DemoWorkout/demoExercises";
import DemoStartChoice from "../DemoWorkout/DemoStartChoice";
import DemoChatBot from "../DemoWorkout/DemoChatBot";
import DemoGoalSelect from "../DemoWorkout/DemoGoalSelect";
import DemoLevelSelect from "../DemoWorkout/DemoLevelSelect";
import ExerciseList from "../DemoWorkout/ExerciseList";
import ExerciseCard from "../DemoWorkout/ExerciseCard";
import RestTimer from "../DemoWorkout/RestTimer";
import ContinueAfterRest from "../DemoWorkout/ContinueAfterRest";
import DemoComplete from "../DemoWorkout/DemoComplete";

export default function WorkoutDemo() {
    // Controls the current step in the demo flow
  const [step, setStep] = useState("start");
    // Stores the selected goal (e.g. strength, cardio, etc.)
  const [goal, setGoal] = useState(null);
    // Stores the selected difficulty level
  const [level, setLevel] = useState(null);
    // Index of the current exercise in the workout
  const [index, setIndex] = useState(0);

    // Load exercises based on selected goal and level
  const exercises =
    goal && level ? demoExercises[goal][level] : [];

  // Called when an exercise is finished
  // If there are more exercises → go to rest
  // Otherwise → finish the demo
  const finishExercise = () => {
    if (index < exercises.length - 1) {
      setStep("rest");
    } else {
      setStep("done");
    }
  };

    // ===== STEP: Start Screen =====
if (step === "start") {
  return (
    <DemoStartChoice
      onWorkout={() => {
        setGoal(null);
        setLevel(null);
        setIndex(0);
        setStep("goal");
      }}
      onChat={() => setStep("chat")}
    />
  );
}
  // ===== STEP: AI Chat Preview =====
  if (step === "chat") {
  return (
    <DemoChatBot
      onBack={() => setStep("start")}
      onStartWorkout={() => setStep("goal")}
    />
  );
}
  // ===== STEP: Goal Selection =====
if (step === "goal") {
  return (
    <DemoGoalSelect
      onSelect={(g) => {
        setGoal(g);
        setStep("level");
      }}
      onBack={() => setStep("start")}
    />
  );
}
  // ===== STEP: Level Selection =====
  if (step === "level") {
    return (
      <DemoLevelSelect
        onSelect={(l) => {
          setLevel(l);
          setStep("list");
        }}
        onBack={() => setStep("goal")}
      />
    );
  }
  // ===== STEP: Exercise List Preview =====
if (step === "list") {
  return (
    <ExerciseList
      exercises={exercises}
      onStart={() => setStep("workout")}
      goToLevel={() => setStep("level")}
    />
  );
}
  // ===== STEP: Active Workout =====
  if (step === "workout") {
    return (
      <ExerciseCard
        key={exercises[index].name}
        exercise={exercises[index]}
        current={index + 1}
        total={exercises.length}
        onFinish={finishExercise}
      />
    );
  }
  // ===== STEP: Rest Between Exercises =====
  if (step === "rest") {
    return (
      <RestTimer
        key={index}
        seconds={5}
        onFinish={() => setStep("confirm")}
      />
    );
  }
  // ===== STEP: Continue After Rest =====
if (step === "confirm") {
  return (
    <ContinueAfterRest
      onContinue={() => {
        setIndex(index + 1);
        setStep("workout");
      }}
      onBack={() => setStep("start")}
    />
  );
}
  // ===== STEP: Demo Finished =====
  if (step === "done") {
    return <DemoComplete />;
  }
  
  return null;
}