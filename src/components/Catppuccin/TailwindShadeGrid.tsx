// components/Catppuccin/CatppuccinShadeGrid.tsx
"use client";

import React from "react";
import copy from "copy-to-clipboard";
import CatppuccinColorSwatch from "./TailwindColorSwatch";

interface CatppuccinShadeGridProps {
  colorsObject: Record<string, string[]>;
}

const CatppuccinShadeGrid = ({ colorsObject }: CatppuccinShadeGridProps) => {
  const shadeKeys = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);

  const handleCopy = (hex: string) => {
    copy(hex.toUpperCase());
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <>
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-[auto_repeat(11,minmax(0,1fr))] items-center gap-x-3 gap-y-2">
        <div />
        {shadeKeys.map((key) => (
          <div
            key={key}
            className="text-center text-xs font-semibold text-muted-foreground"
          >
            {key}
          </div>
        ))}
        {Object.entries(colorsObject).map(([colorName, shades]) => (
          <React.Fragment key={colorName}>
            <div className="pr-4 text-right text-sm font-bold text-foreground">
              {colorName}
            </div>
            {shades.map((hex, idx) => (
              <CatppuccinColorSwatch
                key={`${colorName}-${idx}`}
                hex={hex}
                onCopy={handleCopy}
                isCopied={copiedHex === hex}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Stacked View */}
      <div className="block space-y-6 md:hidden">
        {Object.entries(colorsObject).map(([colorName, shades]) => (
          <div key={colorName}>
            <h3 className="mb-2 text-sm font-bold text-foreground">
              {colorName}
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {shades.map((hex, idx) => (
                <CatppuccinColorSwatch
                  key={`${colorName}-${idx}`}
                  hex={hex}
                  onCopy={handleCopy}
                  isCopied={copiedHex === hex}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CatppuccinShadeGrid;
