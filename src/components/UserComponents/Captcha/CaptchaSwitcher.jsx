import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import ArithmeticCaptcha from "./ArithmeticCaptcha";
import ImageCaptcha from "./ImageCaptcha";
import "./captcha.css";
 

// CAPTCHA controller component.
// Lets the user choose between different CAPTCHA types (Arithmetic or Image),
// tracks failed attempts, locks the CAPTCHA after too many errors,
// and exposes a unified `verifyCaptcha()` method to the parent form.

const MAX_ATTEMPTS = 3;

const CaptchaSwitcher = forwardRef(({ onResult }, ref) => {
  const [type, setType] = useState("arithmetic");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const captchaRef = useRef(null);

  const verifyCaptcha = () => {
    if (!captchaRef.current?.verify) return false;

    const valid = captchaRef.current.verify();

    if (!valid) {
      setAttempts(prev => {
        const next = prev + 1;
        if (next >= MAX_ATTEMPTS) setLocked(true);
        return next;
      });
    }

    onResult(valid);
    return valid;
  };

  useImperativeHandle(ref, () => ({
  verifyCaptcha
}));

  return (
    <>
      <div className="mb-6 Choose CAPTCHA Type ">
        <label className="block text-sm font-medium text-[var(--secondary)]">
          Choose CAPTCHA Type:
        </label>

        <select
          value={type}
          disabled={locked}
          onChange={(e) => setType(e.target.value)}
className="captcha-select mt-1"
        >
          <option value="arithmetic">Arithmetic</option>
          <option value="image">Image Selection</option>
        </select>
      </div>

      {type === "arithmetic" ? (
        <ArithmeticCaptcha
          ref={captchaRef}
          disabled={locked}
          onResult={onResult}
        />
      ) : (
        <ImageCaptcha
          ref={captchaRef}
          disabled={locked}
          onResult={onResult}
        />
      )}

      {locked && (
        <p className="text-sm text-red-600 mt-2">
          Too many incorrect CAPTCHA attempts. Please try again later.
        </p>
      )}
    </>
  );
});
export default CaptchaSwitcher;