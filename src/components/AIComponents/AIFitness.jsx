import AIFitnessBot from "../components/AIComponents/AIFitnessBot";

/*
  AIFitness Page
  ---------------
  This page acts as a thin wrapper around the AIFitnessBot component.
  It exists mainly for routing purposes, so React Router can render
  the AI Fitness experience as a full page.
*/
export default function AIFitness() {
    // Render the main AI fitness component
  return <AIFitnessBot />;
}
