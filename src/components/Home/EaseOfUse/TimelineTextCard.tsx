// components/Home/EaseOfUse/TimelineTextCard.tsx
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";
import { StepData, StepStyle } from "./types";


interface TimelineTextCardProps {
  step: StepData;
  styles: StepStyle;
}

const TimelineTextCard = ({ step, styles }: TimelineTextCardProps) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
    <div className="flex items-center gap-4">
      <div
        className={cn(
          "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full",
          styles.iconBg,
          styles.iconText
        )}
      >
        {step.icon}
      </div>
      <h3 className="font-sans text-2xl font-bold text-card-foreground md:text-3xl">
        {step.title}
      </h3>
    </div>
    <ul className="mt-6 space-y-3 pl-2">
      {step.description.map((point, i) => (
        <li key={i} className="flex items-start gap-3 text-muted-foreground">
          <Check className={cn("mt-1 h-5 w-5 flex-shrink-0", styles.check)} />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TimelineTextCard;
