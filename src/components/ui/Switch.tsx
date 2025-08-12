"use client";

import { cn } from "@/lib/utils";
import React from "react";

// Define the props our Switch will accept
interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const Switch = ({ checked, onCheckedChange, className }: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        // The track/background of the switch
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
        // UPDATED: Uses theme variables for focus ring and offset
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        // UPDATED: Uses theme variables for background color
        checked ? "bg-primary" : "bg-muted",
        className
      )}
    >
      <span
        aria-hidden="true"
        // The thumb/circle of the switch
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
          // Move the thumb based on the 'checked' prop
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
};

export default Switch;
