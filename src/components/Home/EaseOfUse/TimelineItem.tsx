// components/Home/EaseOfUse/TimelineItem.tsx
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import TimelineTextCard from "./TimelineTextCard";
import TimelineVisualCard from "./TimelineVisualCard";
import { StepData, StepStyle } from "./types";


interface TimelineItemProps {
  step: StepData;
  styles: StepStyle;
  isReversed: boolean;
  visual: ReactNode;
}

const TimelineItem = ({
  step,
  styles,
  isReversed,
  visual,
}: TimelineItemProps) => {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
      {/* Text Card */}
      <div
        className={cn("order-2", {
          "md:order-1": !isReversed,
          "md:order-3": isReversed,
        })}
      >
        <TimelineTextCard step={step} styles={styles} />
      </div>

      {/* Timeline Dot */}
      <div
        className={cn(
          "z-10 hidden h-6 w-6 items-center justify-center rounded-full bg-background md:flex md:order-2",
          styles.ring
        )}
      >
        <div className={cn("h-2.5 w-2.5 rounded-full", styles.dot)} />
      </div>

      {/* Visual Card */}
      <div
        className={cn("order-1", {
          "md:order-3": !isReversed,
          "md:order-1": isReversed,
        })}
      >
        <TimelineVisualCard visual={visual} />
      </div>
    </div>
  );
};

export default TimelineItem;
