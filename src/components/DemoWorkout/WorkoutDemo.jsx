import { useState } from "react";
import { demoExercises } from "./demoExercises";

import DemoStartChoice from "./DemoStartChoice";
import DemoChatBot from "./DemoChatBot";
import DemoGoalSelect from "./DemoGoalSelect";
import DemoLevelSelect from "./DemoLevelSelect";
import ExerciseList from "./ExerciseList";
import ExerciseCard from "./ExerciseCard";
import RestTimer from "./RestTimer";
import ContinueAfterRest from "./ContinueAfterRest";
import DemoComplete from "./DemoComplete";

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
    return <DemoChatBot onBack={() => setStep("start")} />;
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
      onBack={() => setStep("done")}
    />
  );
}



  if (step === "done") {
    return <DemoComplete />;
  }

  return null;
}
