// components/GradientPalettes/GradientCard.tsx
"use client";

import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import Color from "color";
import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import React, { memo, useCallback, useMemo, useState } from "react";
import GradientSettingsPopover from "./GradientSettingsPopover";

interface GradientSettings {
  style: "linear" | "radial";
  direction:
    | "to right"
    | "to bottom right"
    | "to bottom"
    | "to bottom left"
    | "to left"
    | "to top left"
    | "to top"
    | "to top right";
  shape: "ellipse" | "circle";
  position:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
  isAnimated: boolean;
  duration: number;
  timing: "linear" | "ease" | "ease-in" | "ease-out";
}

interface Palette {
  id: number;
  type: string;
  colors: string[];
}

const GradientCard = memo(function GradientCard({
  palette,
}: {
  palette: Palette;
}) {
  const [settings, setSettings] = useState<GradientSettings>({
    style: "linear",
    direction: "to right",
    shape: "ellipse",
    position: "center",
    isAnimated: false,
    duration: 10,
    timing: "linear",
  });
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const gradientCss = useMemo(() => {
    const colorStops = palette.colors.join(", ");
    if (settings.style === "radial") {
      return `radial-gradient(${settings.shape} at ${settings.position}, ${colorStops})`;
    }
    return `linear-gradient(${settings.direction}, ${colorStops})`;
  }, [palette.colors, settings]);

  const overlayTextColor = useMemo(() => {
    try {
      const avgColor = Color(palette.colors[0])
        .mix(Color(palette.colors[palette.colors.length - 1]))
        .hex();
      return Color(avgColor).isDark()
        ? "text-primary-foreground"
        : "text-foreground";
    } catch {
      return "text-primary-foreground";
    }
  }, [palette.colors]);

  const handleCopyCss = useCallback(() => {
    let textToCopy = `background: ${gradientCss};`;
    if (settings.isAnimated) {
      textToCopy += `\nbackground-size: 200% 200%;\nanimation: gradient-pan ${settings.duration}s ${settings.timing} infinite alternate;`;
    }
    copy(textToCopy);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  }, [gradientCss, settings]);

  const handleCopyHex = useCallback((hex: string) => {
    copy(hex.toUpperCase());
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  }, []);

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-card border border-border transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1",
        isSettingsOpen && "z-10"
      )}
    >
      <div className="p-4 sm:p-6 space-y-4">
        <div
          className={cn(
            "relative w-full h-40 sm:h-48 md:h-64 rounded-xl group overflow-hidden",
            settings.isAnimated && "gradient-animate"
          )}
          style={
            {
              "--duration": `${settings.duration}s`,
              "--timing": settings.timing,
              backgroundImage: gradientCss,
            } as React.CSSProperties
          }
        >
          <button
            onClick={handleCopyCss}
            className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
          >
            <span
              className={cn(
                "flex items-center gap-2 font-semibold tracking-wider",
                overlayTextColor
              )}
            >
              {copiedCss ? <Check className="text-success" /> : <Copy />}
              {copiedCss ? "Copied!" : "Copy CSS"}
            </span>
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 flex-wrap">
            {palette.colors.map((hex) => (
              <Tooltip text={`Copy ${hex.toUpperCase()}`} key={hex}>
                <button
                  onClick={() => handleCopyHex(hex)}
                  className="relative w-8 h-8 rounded-full shadow-inner transition-transform hover:scale-110"
                  style={{ backgroundColor: hex }}
                >
                  {copiedHex === hex && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60">
                      <Check size={16} className="text-success" />
                    </div>
                  )}
                </button>
              </Tooltip>
            ))}
          </div>
          <GradientSettingsPopover
            settings={settings}
            setSettings={setSettings}
            isOpen={isSettingsOpen}
            setIsOpen={setIsSettingsOpen}
          />
        </div>
      </div>
    </div>
  );
});

export default GradientCard;
