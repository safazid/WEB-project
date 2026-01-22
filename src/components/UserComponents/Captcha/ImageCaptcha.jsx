import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const IMAGES = [
  // 🐱 Cats
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg",
    label: "cat",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Domestic_cat_2019_G1.jpg",
    label: "cat",
  },

  // 🐶 Dogs
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg",
    label: "dog",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/37/Liver_yellow_dog_in_the_water_looking_at_viewer_at_golden_hour_in_Don_Det_Laos.jpg",
    label: "dog",
  },

  // 🚗 Cars
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Fiat_500_in_Emilia-Romagna.jpg",
    label: "car",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/79/DTM_Mercedes_W204_Lauda09_amk.jpg",
    label: "car",
  },

  // 🚲 Bikes
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Dutch_bicycle.jpg",
    label: "bike",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/30/Bicycle%2C_belonging_to_the_bicycle-sharing_system_Bolt_in_Kaunas%2C_Lithuania_in_2022.jpg",
    label: "bike",
  },
];

// Image-based CAPTCHA component.
// Displays a grid of images and asks the user to select all images
// matching a random target label (e.g., cat, dog, car, bike).
// Handles selection toggling, validation logic, error display,
// and exposes a `verify()` method to the parent via ref.

const ImageCaptcha = forwardRef(({ disabled, onResult }, ref) => {
  const [target, setTarget] = useState("");
  const [selected, setSelected] = useState([]);
  const [showError, setShowError] = useState(false);

  const generate = () => {
    const labels = [...new Set(IMAGES.map(i => i.label))];
    setTarget(labels[Math.floor(Math.random() * labels.length)]);
    setSelected([]);
    setShowError(false);
    onResult(false);
  };

  useEffect(() => {
    generate();
  }, []);

  const toggle = (idx) => {
    if (disabled) return;
    setSelected(prev =>
      prev.includes(idx)
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

  const verify = () => {
    const correct = IMAGES
      .map((img, i) => img.label === target ? i : null)
      .filter(i => i !== null);

    const valid =
      selected.length === correct.length &&
      selected.every(i => correct.includes(i));

    setShowError(!valid);
    onResult(valid);
    return valid;
  };

  // 👇 expose verify()
  useImperativeHandle(ref, () => ({
    verify
  }));

  return (
    <div className="mb-6">
      <p className="mb-2">
        Select all images containing: <b>{target}</b>
      </p>

      <button type="button" onClick={generate} disabled={disabled}>
        🔄 Refresh
      </button>

      <div id="image-options">
        {IMAGES.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            onClick={() => toggle(idx)}
            className={selected.includes(idx) ? "selected" : ""}
            alt=""
          />
        ))}
      </div>

      {showError && (
        <p className="text-red-500 text-sm mt-1">
          Incorrect selection
        </p>
      )}
    </div>
  );
});

export default ImageCaptcha;