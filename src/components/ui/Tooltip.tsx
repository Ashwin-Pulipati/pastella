import { cn } from "@/lib/utils";
import * as React from "react";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  text,
  position = "top",
  children,
  className,
  ...props
}: Readonly<TooltipProps>) {
  return (
    <div className={cn("group relative inline-block", className)} {...props}>
      {/* The trigger element */}
      <div className="peer">{children}</div>

      {/* The Tooltip Popover */}
      <div
        role="tooltip"
        className={cn(
          // Base Styles
          "absolute z-10 rounded-md px-2.5 py-1 text-sm font-semibold whitespace-nowrap",
          // Theming via semantic theme variables
          "bg-accent text-accent-foreground shadow-lg",
          // Peer-driven state & animation
          "scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100",
          "peer-focus-visible:scale-100 peer-focus-visible:opacity-100",
          // Prevents the tooltip from capturing mouse events
          "pointer-events-none",
          // Conditional positioning
          position === "top" && "bottom-full left-1/2 mb-2 -translate-x-1/2",
          position === "bottom" && "top-full left-1/2 mt-2 -translate-x-1/2",
          position === "left" && "top-1/2 right-full mr-2 -translate-y-1/2",
          position === "right" && "top-1/2 left-full ml-2 -translate-y-1/2"
        )}
      >
        {text}

        {/* The Arrow */}
        <div
          className={cn(
            "absolute h-2 w-2 rotate-45",
            // The arrow should match the tooltip's background color
            "bg-accent",
            // Conditional positioning for the arrow
            position === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2",
            position === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2",
            position === "left" && "top-1/2 right-[-4px] -translate-y-1/2",
            position === "right" && "top-1/2 left-[-4px] -translate-y-1/2"
          )}
        />
      </div>
    </div>
  );
}
