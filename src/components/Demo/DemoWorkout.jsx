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
  const [step, setStep] = useState("start");
  const [goal, setGoal] = useState(null);
  const [level, setLevel] = useState(null);
  const [index, setIndex] = useState(0);

  const exercises =
    goal && level ? demoExercises[goal][level] : [];

  const finishExercise = () => {
    if (index < exercises.length - 1) {
      setStep("rest");
    } else {
      setStep("done");
    }
  };

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


  if (step === "chat") {
  return (
    <DemoChatBot
      onBack={() => setStep("start")}
      onStartWorkout={() => setStep("goal")}
    />
  );
}

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

if (step === "list") {
  return (
    <ExerciseList
      exercises={exercises}
      onStart={() => setStep("workout")}
      goToLevel={() => setStep("level")}
    />
  );
}


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

  if (step === "rest") {
    return (
      <RestTimer
        key={index}
        seconds={5}
        onFinish={() => setStep("confirm")}
      />
    );
  }

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



  if (step === "done") {
    return <DemoComplete />;
  }
  
  return null;
}
