// components/Home/EaseOfUse/TimelineVisualCard.tsx
import React, { ReactNode } from "react";

interface TimelineVisualCardProps {
  visual: ReactNode;
}

const TimelineVisualCard = ({ visual }: TimelineVisualCardProps) => (
  <div className="hidden md:block h-64 rounded-2xl border border-border bg-card p-4 shadow-lg md:h-80">
    {visual}
  </div>
);

export default TimelineVisualCard;
