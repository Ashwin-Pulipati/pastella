"use client";

import Dropdown from "@/components/ui/Dropdown";
import { AnimationTiming } from "@/types/pastelPalette.types";
import React from "react";

interface AnimationControlsProps {
  animationStyle: AnimationTiming;
  setAnimationStyle: (style: AnimationTiming) => void;
  animationDuration: number;
  setAnimationDuration: (duration: number) => void;
}

const ANIMATION_EASING_OPTIONS: {
  id: AnimationTiming;
  label: string;
}[] = [
  { id: "linear", label: "Linear" },
  { id: "ease", label: "Ease" },
  { id: "ease-in", label: "Ease In" },
  { id: "ease-out", label: "Ease Out" },
];

const AnimationControls: React.FC<AnimationControlsProps> = ({
  animationStyle,
  setAnimationStyle,
  animationDuration,
  setAnimationDuration,
}) => {
  return (
    <div className="w-full rounded-2xl border border-border shadow">
      {/* Responsive padding for the card */}
      <div className="w-full space-y-4 rounded-[15px] bg-card p-4 sm:p-6">
        {/* Responsive heading */}
        <h3 className="text-lg sm:text-xl font-bold font-sans text-card-foreground">
          Animation
        </h3>

        {/* Easing Dropdown: Stacks on mobile, row on larger screens */}
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="animation-easing-dropdown"
            className="text-sm font-medium text-foreground"
          >
            Easing
          </label>
          <Dropdown
            id="animation-easing-dropdown"
            label={
              ANIMATION_EASING_OPTIONS.find((opt) => opt.id === animationStyle)
                ?.label || "Linear"
            }
            items={ANIMATION_EASING_OPTIONS.map((opt) => ({
              id: `easing-${opt.id}`,
              label: opt.label,
              onClick: () => setAnimationStyle(opt.id),
            }))}
            // Dropdown is full-width on mobile for better usability
            className="text-sm w-full sm:w-auto"
          />
        </div>

        {/* Duration Slider */}
        <div className="border-t border-border pt-4">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="animation-duration-slider"
              className="text-sm font-medium text-foreground"
            >
              Duration
            </label>
            <span className="font-mono text-sm text-foreground bg-muted px-2 py-0.5 rounded-md">
              {animationDuration.toFixed(1)}s
            </span>
          </div>
          <input
            id="animation-duration-slider"
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(parseFloat(e.target.value))}
            className="neu-slider w-full"
            style={{ background: "var(--background-image-gradient)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;
