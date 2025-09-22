// components/Catppuccin/CatppuccinTailwindThemeSection.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useInView } from "react-intersection-observer";
import CatppuccinShadeGrid from "./TailwindShadeGrid";

interface ThemeSectionProps {
  themeName: string;
  colorsObject: Record<string, string[]>;
}

const CatppuccinTailwindThemeSection = ({
  themeName,
  colorsObject,
}: ThemeSectionProps) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const gradientStopMap: Record<string, string> = {
    latte: "from-transparent to-muted-foreground/50",
    frappe: "from-transparent to-muted/60 dark:to-muted-foreground/50",
    macchiato: "from-transparent to-muted/60 dark:to-muted-foreground/50",
    mocha: "from-transparent to-muted/60 dark:to-muted-foreground/50",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto max-w-7xl transition-opacity duration-1000 ease-in",
        inView ? "opacity-100" : "opacity-0",
        themeName === "latte" && "border border-muted w-full p-8 rounded-2xl",
        themeName === "frappe" && "bg-[#303446] w-full p-8 rounded-2xl",
        themeName === "macchiato" && "bg-[#24273A] w-full p-8 rounded-2xl",
        themeName === "mocha" && "bg-[#1E1E2E] w-full p-8 rounded-2xl"
      )}
    >
      <div className="flex items-center justify-center space-x-4 mb-6 sm:mb-8">
        <div
          className={cn(
            "h-0.5 flex-1 rounded-r-full bg-gradient-to-r",
            gradientStopMap[themeName]
          )}
        />
        <h2
          className={cn(
            "text-center font-sans text-2xl md:text-3xl font-bold uppercase tracking-widest",
            themeName === "latte" ? "text-muted-foreground": "text-muted dark:text-muted-foreground"
          )}
        >
          {themeName}
        </h2>
        <div
          className={cn(
            "h-0.5 flex-1 rounded-l-full bg-gradient-to-l",
            gradientStopMap[themeName]
          )}
        />
      </div>
      <CatppuccinShadeGrid colorsObject={colorsObject} themeName={themeName} />
    </div>
  );
};

export default CatppuccinTailwindThemeSection;
