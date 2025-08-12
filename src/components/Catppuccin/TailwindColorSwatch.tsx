// components/Catppuccin/CatppuccinColorSwatch.tsx
"use client";

import React from "react";
import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface ColorSwatchProps {
  hex: string;
  onCopy: (hex: string) => void;
  isCopied: boolean;
}

const CatppuccinColorSwatch: React.FC<ColorSwatchProps> = ({
  hex,
  onCopy,
  isCopied,
}) => (
  <Tooltip text={`Copy ${hex.toUpperCase()}`}>
    <button
      onClick={() => onCopy(hex)}
      className="group relative w-full aspect-square cursor-pointer rounded-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
      style={{ backgroundColor: hex }}
      aria-label={`Copy color ${hex}`}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-sm transition-opacity duration-300",
          isCopied ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-center text-foreground">
          <CheckCircle className="mx-auto text-success" />
          <p className="mt-1 text-xs font-semibold">Copied!</p>
        </div>
      </div>
    </button>
  </Tooltip>
);

export default CatppuccinColorSwatch;
