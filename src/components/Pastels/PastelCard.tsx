"use client";

import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import Color from "color"; // Import the color package
import copy from "copy-to-clipboard";
import { CheckCircle, Copy } from "lucide-react";
import React from "react";

const PastelCard = ({ color }: { color: { name: string; hex: string } }) => {
  const [copied, setCopied] = React.useState(false);

  // Determine if the background color is dark for text contrast
  const isDarkBg = Color(color.hex).isDark();
  // UPDATED: Uses theme variables for text color
  const textColorClass = isDarkBg
    ? "text-primary-foreground"
    : "text-foreground";

  const handleCopy = React.useCallback(() => {
    copy(color.hex.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [color.hex]);

  return (
    <button
      // UPDATED: Uses theme shadow
      className="relative w-full aspect-square group rounded-3xl cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:shadow-lg hover:scale-105"
      onClick={handleCopy}
      style={{ backgroundColor: color.hex }}
    >
      <div
        className={cn(
          "absolute inset-0 p-4 flex flex-col justify-between",
          textColorClass // Apply the dynamic text color here
        )}
      >
        <h3 className="font-sans font-bold text-xl break-words text-center">
          {color.name}
        </h3>
        <div className="flex justify-between items-center">
          <p className="font-body font-medium tracking-wider text-base">
            {color.hex.toUpperCase()}
          </p>
          <Tooltip text="Copy">
            <Copy
              className="opacity-0 group-hover:opacity-60 transition-opacity"
              size={18}
            />
          </Tooltip>
        </div>
      </div>

      {/* "Copied!" Overlay - UPDATED with theme variables */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full z-10 rounded-3xl",
          "flex items-center justify-center transition-opacity duration-300 ease-in-out",
          "bg-background/70 backdrop-blur-sm",
          copied ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="text-center text-foreground">
          <CheckCircle className="mx-auto text-success" size={40} />
          <p className="mt-2 text-lg font-semibold">Copied!</p>
        </div>
      </div>
    </button>
  );
};

export default React.memo(PastelCard);
