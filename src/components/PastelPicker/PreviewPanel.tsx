import { PreviewPanelProps } from "@/components/PastelPicker/types";
import React from "react";
import ColorCodeDisplay from "./ColorCodeDisplay";

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  previewStyle,
  activeHsl,
  colorFormats,
}) => {
  // Determines text color based on the background's lightness for contrast.
  const textColor = activeHsl.l > 65 ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 98%)";

  return (
    <div className="flex-1 rounded-2xl bg-gradient p-0.5 shadow-lg">
      <div className="flex h-full w-full flex-col items-center gap-4 sm:gap-6 rounded-[23px] bg-card p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold font-sans text-card-foreground">
          COLOR PREVIEW
        </h2>
        {/* Responsive preview circle */}
        <div
          className="mt-2 sm:mt-4 flex h-40 w-40 items-center justify-center rounded-full shadow-lg transition-all duration-500 ease-in-out sm:h-48 sm:w-48 md:h-56 md:w-56"
          style={previewStyle}
        >
          {/* Responsive text */}
          <span
            className="font-semibold text-5xl sm:text-6xl font-sans text-shadow-lg"
            style={{ color: textColor }}
          >
            Aa
          </span>
        </div>
        <div className="mt-2 sm:mt-4 flex w-full max-w-sm flex-col items-center gap-2">
          <ColorCodeDisplay label="CSS" value={colorFormats.css} />
          <ColorCodeDisplay label="Tailwind" value={colorFormats.tailwind} />
          <ColorCodeDisplay label="HEX" value={colorFormats.hex} />
          <ColorCodeDisplay label="RGB" value={colorFormats.rgb} />
          <ColorCodeDisplay label="HSL" value={colorFormats.hsl} />
          <ColorCodeDisplay label="CMYK" value={colorFormats.cmyk} />
          <ColorCodeDisplay label="OKLCH" value={colorFormats.oklch} />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
