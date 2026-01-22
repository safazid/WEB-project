import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import FullScreenCountdown from "./FullScreenCountdown";
// 🖼️ Images
import squatsImg from "../../assets/squats.png";
import bodyweightSquatsImg from "../../assets/Bodyweight_Squats.png";
import jumpSquatsImg from "../../assets/Jump_Squats.png";
import pushUpsImg from "../../assets/Push-ups.png";
import wallPushUpsImg from "../../assets/Wall_Push-ups.png";
import lungesImg from "../../assets/Lunges.png";
import dumbbellLungesImg from "../../assets/Dumbbell_Lunges.png";
import bulgarianImg from "../../assets/bulgarian.png";
import jumpingJacksImg from "../../assets/Jumping_Jacks.png";
import highKneesImg from "../../assets/High_knees.png";
import marchImg from "../../assets/March_in_place.png";
import burpeesImg from "../../assets/Burpees.png";
import mountainClimbersImg from "../../assets/Mountain_Climbers.png";
import plankImg from "../../assets/Plank_Hold.png";

// ExerciseCard displays a single exercise during the demo workout.
// It shows the exercise name, position in the workout, and a matching image.
// The component moves through three phases:
// - "idle": shows a button to start the exercise
// - "pre": shows a full-screen countdown before starting
// - "active": runs a timer for the exercise duration
// When the timer finishes, onFinish is called to move to the next exercise.
export default function ExerciseCard({
  exercise,
  onFinish,
  current,
  total,
}) {
  const [phase, setPhase] = useState("idle");

  // 🔄 Reset when exercise changes
  useEffect(() => {
    setPhase("idle");
  }, [exercise.name]);

  // 🧠 Smart image selection
  let imageToShow = null;
  const name = exercise.name.toLowerCase();

  if (name.includes("bodyweight") && name.includes("squat")) {
    imageToShow = bodyweightSquatsImg;
  } else if (name.includes("jump") && name.includes("squat")) {
    imageToShow = jumpSquatsImg;
  } else if (name.includes("squat")) {
    imageToShow = squatsImg;
  } else if (name.includes("wall") && name.includes("push")) {
    imageToShow = wallPushUpsImg;
  } else if (name.includes("push")) {
    imageToShow = pushUpsImg;
  } else if (name.includes("dumbbell") && name.includes("lunge")) {
    imageToShow = dumbbellLungesImg;
  } else if (name.includes("bulgarian")) {
    imageToShow = bulgarianImg;
  } else if (name.includes("lunge")) {
    imageToShow = lungesImg;
  } else if (name.includes("jumping") || name.includes("jack")) {
    imageToShow = jumpingJacksImg;
  } else if (name.includes("high knee")) {
    imageToShow = highKneesImg;
  } else if (name.includes("march")) {
    imageToShow = marchImg;
  } else if (name.includes("burpee")) {
    imageToShow = burpeesImg;
  } else if (name.includes("mountain")) {
    imageToShow = mountainClimbersImg;
  } else if (name.includes("plank")) {
    imageToShow = plankImg;
  }

  return (
    <div className="max-w-md mx-auto text-center p-6">
      <p className="text-sm text-gray-500 mb-2">
        Exercise {current} of {total}
      </p>

      <h2 className="text-2xl font-bold mb-3">
        {exercise.name}
      </h2>

      {/* 🖼️ Exercise image */}
      {imageToShow && (
        <div className="rounded-xl overflow-hidden mb-4">
          <div className="relative">
  <img
    src={imageToShow}
    alt={exercise.name}
    className="w-full h-64 object-cover"
  />

  <div
    className="absolute inset-0"
    style={{ background: "rgba(0,0,0,0.25)" }}
  />
</div>

        </div>
      )}

      {phase === "idle" && (
        <button
          onClick={() => setPhase("pre")}
          className="auth-btn w-full py-3 rounded-xl font-semibold"
          style={{ background: "var(--primary)" }}
        >
          Try Exercise
        </button>
      )}

      {phase === "pre" && (
        <FullScreenCountdown
          onFinish={() => setPhase("active")}
        />
      )}

      {phase === "active" && (
        <Countdown
          key={exercise.name}
          seconds={exercise.duration}
          onComplete={onFinish}
        />
      )}
    </div>
  );
}