import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

// Simple arithmetic CAPTCHA component.
// Generates a small math question and verifies the user's answer
// to prevent automated form submissions.

const ArithmeticCaptcha = forwardRef(({ disabled, onResult }, ref) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showError, setShowError] = useState(false);

  const generate = () => {
    const x = Math.floor(Math.random() * 10) + 1;
    const y = Math.floor(Math.random() * 10) + 1;
    setA(x);
    setB(y);
    setAnswer("");
    setShowError(false);
    onResult(false);
  };

  useEffect(() => {
    generate();
  }, []);

  const verify = () => {
    const valid = Number(answer) === a + b;
    setShowError(!valid);
    onResult(valid);
    return valid;
  };

  useImperativeHandle(ref, () => ({
    verify
  }));

  return (
    <div className="mb-6 ">
<label className="block text-sm font-medium mb-2 text-[var(--secondary)]">
        Solve the CAPTCHA:
      </label>

      <div className="flex items-center gap-4 mb-2">
        <span className="text-lg font-semibold">
          {a} + {b} = ?
        </span>

        <button
          type="button"
          onClick={generate}
          disabled={disabled}
        >
          🔄
        </button>
      </div>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
        className="auth-input"
        placeholder="Enter the answer"
      />

      {showError && (
        <p className="text-sm text-red-500 mt-1">
          Incorrect CAPTCHA answer
        </p>
      )}
    </div>
  );
});

export default ArithmeticCaptcha;