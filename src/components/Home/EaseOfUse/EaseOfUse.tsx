// components/Home/EaseOfUse/EaseOfUse.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";
import TimelineItem from "./TimelineItem";
import VisualStep1 from "./VisualStepOne";
import VisualStep2 from "./VisualStepTwo";
import VisualStep3 from "./VisualStepThree";
import { Copy, SlidersHorizontal, Wand2 } from "lucide-react";

// Visual components for the timeline steps
const stepVisuals = [
  <VisualStep1 key={1} />,
  <VisualStep2 key={2} />,
  <VisualStep3 key={3} />,
];

export const stepsData = [
  {
    step: 1,
    icon: <SlidersHorizontal />, // Raw icon
    title: "Choose Your Method",
    description: [
      "Select from curated palettes.",
      "Use AI with keywords like 'ocean'.",
      "Start from your own seed colors.",
    ],
  },
  {
    step: 2,
    icon: <Wand2 />, // Raw icon
    title: "Generate & Refine",
    description: [
      "Generate with a single click.",
      "Fine-tune the size and harmony.",
      "Adjust animations and styles.",
    ],
  },
  {
    step: 3,
    icon: <Copy />, // Raw icon
    title: "Copy & Create",
    description: [
      "Instantly copy any color's hex code.",
      "Grab the full CSS for any gradient.",
      "Implement directly into your project.",
    ],
  },
];


const stepStyles = [
  {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    check: "text-primary",
    dot: "bg-primary",
    ring: "ring-4 ring-primary/50",
  },
  {
    iconBg: "bg-secondary/10",
    iconText: "text-secondary",
    check: "text-secondary",
    dot: "bg-secondary",
    ring: "ring-4 ring-secondary/50",
  },
  {
    iconBg: "bg-accent/10",
    iconText: "text-accent",
    check: "text-accent",
    dot: "bg-accent",
    ring: "ring-4 ring-accent/50",
  },
];

// --- Main Component ---
const EaseOfUse = () => {
  return (
    <div className="relative px-2 sm:px-6 lg:px-8 xl:px-0">
      <h2 className="mb-10 text-center text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
        <span className="gradient-text-clip bg-gradient font-special tracking-widest">
          Simple & Powerful
        </span>
      </h2>
      <div
        className={cn(
          "relative mx-auto max-w-md grid-cols-1 gap-16 md:max-w-none md:grid",
          "before:absolute before:left-1/2 before:top-0 before:hidden before:h-full before:w-px before:-translate-x-1/2",
          "before:bg-gradient md:gap-24 md:before:block"
        )}
      >
        {stepsData.map((step, index) => (
          <TimelineItem
            key={step.step}
            step={step}
            styles={stepStyles[index]}
            isReversed={index % 2 === 1}
            visual={stepVisuals[step.step - 1]}
          />
        ))}
      </div>
    </div>
  );
};

export default EaseOfUse;
