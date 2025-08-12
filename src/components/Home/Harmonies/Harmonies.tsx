import React from "react";

export type HarmonyData = {
  key: string;
  harmonyType: string;
  colors: string[] | string;
  glowColors: string[];
  description: string;
};

export const harmonyData: HarmonyData[] = [
  {
    key: "Pastel Sunset",
    harmonyType: "Analogous",
    colors: ["#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"],
    glowColors: ["#FFB7B2", "#E2F0CB", "#C7CEEA"],
    description:
      "A gentle, dreamy palette that captures the soft glow of a hazy sunset, with muted pinks, soft peaches, and light lavender.",
  },
  {
    key: "Misty Forest",
    harmonyType: "Triadic",
    colors: ["#C1E1C1", "#A9DFBF", "#B5EAD7", "#E0F2F1", "#D6EAF8"],
    glowColors: ["#C1E1C1", "#B5EAD7", "#D6EAF8"],
    description:
      "A cool and tranquil palette reminiscent of a forest shrouded in mist, featuring soft sage, gentle mint, and pale, airy blues.",
  },
  {
    key: "Stardust Dream",
    harmonyType: "Monochromatic",
    colors: ["#E3E4FA", "#D9D2E9", "#C7CEEA", "#B5B9D9", "#A2A6C8"],
    glowColors: ["#E3E4FA", "#C7CEEA", "#A2A6C8"],
    description:
      "A whimsical and ethereal palette inspired by distant nebulae, with soft lavenders, dusty rose, and the gentle twinkle of starlight.",
  },
  {
    key: "Seashell Cove",
    harmonyType: "Complementary",
    colors: ["#F0F8FF", "#E0FFFF", "#AFEEEE", "#FFDAB9", "#FFE4E1"],
    glowColors: ["#E0FFFF", "#AFEEEE", "#FFE4E1"],
    description:
      "A serene palette that evokes a peaceful shoreline, with the colors of pale seafoam, smooth seashells, and soft morning light.",
  },
  {
    key: "Flowing Meadow",
    harmonyType: "Analogous",
    colors: "linear-gradient(to top right, #B5EAD7, #E2F0CB, #FFDAC1, #B5EAD7)",
    glowColors: ["#B5EAD7", "#E2F0CB", "#FFDAC1"],
    description:
      "A soft, flowing gradient of pastel mint, gentle lime, and warm peach, creating a serene and natural feel.",
  },
  {
    key: "Pastel Trinity",
    harmonyType: "Triadic",
    colors: "radial-gradient(circle, #F8C8DC, #C8F8DC, #DCC8F8, #F8C8DC)",
    glowColors: ["#F8C8DC", "#C8F8DC", "#DCC8F8"],
    description:
      "A balanced and playful animated palette using three evenly spaced pastel hues for a harmonious and engaging effect.",
  },
  {
    key: "Sky Gradient",
    harmonyType: "Monochromatic",
    colors: "linear-gradient(to bottom, #e0f7fa, #b2ebf2, #80deea, #e0f7fa)",
    glowColors: ["#e0f7fa", "#b2ebf2", "#80deea"],
    description:
      "A calming animated gradient that flows through various tints and tones of a single sky-blue hue, creating a sense of peace.",
  },
  {
    key: "Dawn & Dusk",
    harmonyType: "Complementary",
    colors:
      "radial-gradient(ellipse at bottom left, #ffdac1, #b5ead7, #ffdac1, #b5ead7)",
    glowColors: ["#ffdac1", "#b5ead7", "#ffdac1"],
    description:
      "A beautiful animated gradient of opposing pastels—soft peach and cool mint—representing the gentle contrast of dawn and dusk.",
  },
];

const Harmonies = () => {
  return (
    // Add responsive padding for the whole section
    <div className="w-full px-2 sm:px-6 lg:px-8 xl:px-0">
      <div className="mx-auto w-full max-w-7xl text-center">
        {/* Responsive heading for better scaling */}
        <h2 className="mb-6 text-center text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          <span className="gradient-text-clip bg-gradient font-special tracking-widest">
            Built on Harmonies
          </span>
        </h2>

        {/* The grid layout is already responsive, which is great! */}
        <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-4">
          {harmonyData.map((palette) => (
            <div
              key={palette.key}
              // Card has responsive padding
              className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-lg transition-all duration-300 hover:-translate-y-2 sm:p-5"
            >
              {/* Color preview box with responsive height */}
              <div className="relative mb-4 h-24 w-full overflow-hidden rounded-lg border border-border sm:h-32">
                {Array.isArray(palette.colors) ? (
                  <div className="flex h-full w-full">
                    {palette.colors.map((color) => (
                      <div
                        key={color}
                        className="h-full w-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="h-full w-full animate-gradient"
                    style={{ backgroundImage: palette.colors }}
                  />
                )}
                <div className="font-sans absolute top-2 right-2 rounded-full bg-background/50 px-2 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                  {palette.harmonyType}
                </div>
              </div>

              <div className="relative z-10 flex flex-grow flex-col">
                <h3 className="font-sans text-xl font-semibold tracking-wide text-card-foreground">
                  {palette.key}
                </h3>
                {/* Removed fixed height (h-20) for more robust text handling */}
                <p className="font-body mt-1 flex-grow tracking-wide text-muted-foreground">
                  {palette.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Harmonies;
