import logo from "../../assets/YOUR_LOGO.png";

/*
  AboutSection
  ------------
  This section introduces the FitRise platform.

  Purpose:
  - Presents a short description of what FitRise offers.
  - Highlights the main idea: AI-powered workouts, progress tracking,
    and daily motivation.
  - Displays the FitRise logo alongside the text.

  Structure:
  - Uses a responsive two-column layout on medium screens and above.
  - Left side: Title and descriptive text.
  - Right side: Centered logo image.

  Styling:
  - Uses Tailwind classes for spacing, layout, and typography.
  - Text color adapts using CSS variables (var(--text-sub)).
*/
export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-4">
            About FitRise
          </h3>
          <p className="text-lg" style={{ color: "var(--text-sub)" }}>
            FitRise helps users stay consistent with AI-powered workouts,
            progress tracking and daily motivation.
          </p>
        </div>

        <div className="flex justify-center">
          <img src={logo} alt="FitRise" className="w-64" />
        </div>
      </div>
    </section>
  );
}