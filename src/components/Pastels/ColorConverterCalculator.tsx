"use client";

import { Button } from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import { hexToRgb, rgbToCmyk, rgbToHsl, rgbToOklch } from "@/lib/colors.utils";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, X } from "lucide-react";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import ColorCodeDisplay from "../PastelPicker/ColorCodeDisplay";

export const ColorConverterCalculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputColor, setInputColor] = useState("#fbcfe8");

  const convertedValues = useMemo(() => {
    const rgb = hexToRgb(inputColor);
    if (!rgb) return { rgb: "...", hsl: "...", cmyk: "...", oklch: "..." };
    const hsl = rgbToHsl(rgb);
    const [c, m, y, k] = rgbToCmyk(rgb);
    const [okL, okC, okH] = rgbToOklch(rgb);
    return {
      rgb: `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(
        rgb.b
      )})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cmyk: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`,
      oklch: `oklch(${okL.toFixed(3)} ${okC.toFixed(3)} ${okH.toFixed(2)})`,
    };
  }, [inputColor]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let text = e.target.value;
      if (!text.startsWith("#")) {
        text = `#${text.replace(/[^a-f0-9]/gi, "")}`;
      }
      setInputColor(text.slice(0, 7));
    },
    []
  );

  return (
    <>
      {/* Trigger Button: Hidden when the panel is open */}
      <Button
        variant="tertiary"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 right-0 z-40 px-3 py-5 sm:px-4 sm:py-6 rounded-l-2xl transition-all duration-300 ease-in-out hover:pr-5 sm:hover:pr-6",
          isOpen && "opacity-0 pointer-events-none"
        )}
        aria-label="Open Color Converter"
      >
        <Calculator className="text-accent-foreground/80" size={24} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <Fragment>
            {/* Overlay: Appears on mobile to focus on the panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
              aria-hidden="true"
            />

            {/* The Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-gradient p-0.5 sm:h-auto sm:top-1/2 sm:-translate-y-1/2 rounded-[18px] md:rounded-l-[18px]"
            >
              <div className="flex h-full w-full flex-col gap-5 bg-card p-4 sm:p-6 rounded-2xl md:rounded-l-3xl overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-sans font-bold tracking-wider text-card-foreground">
                    Color Converter
                  </h3>
                  <Tooltip text="Close" position="bottom">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close Color Converter"
                      className="w-9 h-9 rounded-full"
                    >
                      <X size={20} />
                    </Button>
                  </Tooltip>
                </div>

                <div className="relative flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg shadow flex-shrink-0"
                    style={{
                      backgroundColor: hexToRgb(inputColor)
                        ? inputColor
                        : "#FFFFFF",
                    }}
                  />
                  <input
                    type="text"
                    value={inputColor}
                    onChange={handleInputChange}
                    placeholder="#fbcfe8"
                    className="w-full p-3 text-lg rounded-lg font-mono font-semibold tracking-wide text-foreground bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <ColorCodeDisplay label="RGB" value={convertedValues.rgb} />
                  <ColorCodeDisplay label="HSL" value={convertedValues.hsl} />
                  <ColorCodeDisplay label="CMYK" value={convertedValues.cmyk} />
                  <ColorCodeDisplay
                    label="OKLCH"
                    value={convertedValues.oklch}
                  />
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </>
  );
};
