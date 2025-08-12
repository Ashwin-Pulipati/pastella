"use client";

import { ControlsPanelProps } from "@/components/PastelPicker/types";
import { Button } from "@/components/ui/Button";
import {
  pastelBubbleBorders,
  pastelBubbleFills,
} from "@/constants/pastelPicker.constants";
import { cn } from "@/lib/utils";
import { HSLColor } from "@/types/pastelPalette.types";
import { motion } from "framer-motion";
import { Palette, SlidersHorizontal } from "lucide-react";
import React from "react";
import ColorBubble from "./ColorBubble";
import ColorSlider from "./ColorSlider";

const allPastelColors = [
  ...new Set([...pastelBubbleFills, ...pastelBubbleBorders]),
];

const TABS = [
  { id: "creator", label: "Custom", icon: SlidersHorizontal },
  { id: "palette", label: "Presets", icon: Palette },
];

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  view,
  setView,
  selectedPaletteColor,
  setSelectedPaletteColor,
  customColor,
  setCustomColor,
}) => {
  const handleCustomColorChange = (field: keyof HSLColor, value: number) => {
    setCustomColor({ ...customColor, [field]: value });
  };

  return (
    <div className="flex-1 rounded-2xl bg-gradient p-0.5 shadow-lg">
      <div className="flex h-full w-full flex-col items-center gap-4 sm:gap-6 rounded-[23px] bg-card p-4 sm:p-6">
        {/* Tab Switcher */}
        <div className="relative flex w-full max-w-xs justify-center rounded-full bg-muted p-1">
          {TABS.map((tab) => {
            const isActive = view === tab.id;
            return (
              <Button
                variant="ghost"
                key={tab.id}
                onClick={() => setView(tab.id as "creator" | "palette")}
                className={cn(
                  "relative z-10 flex flex-1 items-center justify-center rounded-full p-2 text-sm font-semibold transition-colors duration-300",
                  !isActive && "text-muted-foreground"
                )}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {/* Sliding pill effect */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill-controls"
                    className="absolute inset-0 rounded-full bg-primary shadow"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-20 flex items-center gap-2",
                    isActive && "text-primary-foreground"
                  )}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Content Area */}
        {view === "palette" ? (
          // Responsive grid for color bubbles
          <div className="grid w-full flex-grow grid-cols-4 place-items-center gap-x-2 gap-y-4 overflow-y-auto p-1 sm:grid-cols-5 sm:gap-4">
            {allPastelColors.map((colorClass) => (
              <ColorBubble
                key={colorClass}
                colorClass={colorClass}
                onSelect={setSelectedPaletteColor}
                isSelected={selectedPaletteColor === colorClass}
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-grow flex-col items-center justify-center space-y-4 sm:space-y-6 px-2 sm:px-4">
            <ColorSlider
              label="Hue"
              value={customColor.h}
              onChange={(e) =>
                handleCustomColorChange("h", Number(e.target.value))
              }
              min={0}
              max={360}
              gradient="linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)"
            />
            <ColorSlider
              label="Saturation"
              value={customColor.s}
              onChange={(e) =>
                handleCustomColorChange("s", Number(e.target.value))
              }
              min={30}
              max={75}
              gradient={`linear-gradient(to right, hsl(${customColor.h},30%,${customColor.l}%), hsl(${customColor.h},75%,${customColor.l}%))`}
            />
            <ColorSlider
              label="Lightness"
              value={customColor.l}
              onChange={(e) =>
                handleCustomColorChange("l", Number(e.target.value))
              }
              min={70}
              max={95}
              gradient={`linear-gradient(to right, hsl(${customColor.h},${customColor.s}%,70%), hsl(${customColor.h},${customColor.s}%,95%))`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsPanel;
