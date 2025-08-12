// components/Pastels/PastelSection.tsx
"use client";

import PastelCard from "@/components/Pastels/PastelCard";
import { gradientStopMap, groupColorMap } from "@/constants/pastels.constants";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import React from "react";

// --- Type Definitions ---
interface PastelColor {
  name: string;
  hex: string;
  rgb?: string;
  hsl?: string;
}

interface PastelSectionProps {
  groupKey: string;
  colors: PastelColor[];
}

// --- Component ---
const PastelSection = ({ groupKey, colors }: PastelSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const normalizedKey = groupKey.replace(/^group/i, "").toLowerCase();
  const groupTitle = groupKey.replace(/^group/i, "Group ");
  const textClass = groupColorMap[normalizedKey] || "text-foreground";
  const gradientStops =
    gradientStopMap[normalizedKey] || "from-muted to-transparent";

  return (
    <section
      ref={ref}
      key={groupKey}
      className={cn(
        "space-y-6 md:space-y-8 transition-opacity duration-1000 ease-in",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex items-center justify-center space-x-4">
        <div
          className={cn(
            "h-0.5 flex-1 rounded-r-full bg-gradient-to-r",
            gradientStops
          )}
        />
        <h2
          className={cn(
            "text-2xl md:text-3xl font-sans font-bold uppercase tracking-widest text-center",
            textClass
          )}
        >
          {groupTitle}
        </h2>
        <div
          className={cn(
            "h-0.5 flex-1 rounded-l-full bg-gradient-to-l",
            gradientStops
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
        {colors.map((color, idx) => (
          <PastelCard key={`${groupKey}-${idx}`} color={color} />
        ))}
      </div>
    </section>
  );
};

export default PastelSection;
