// ColorBubble.tsx
import { ColorBubbleProps } from "@/components/PastelPicker/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { memo } from "react";

const ColorBubble = ({
  colorClass,
  isSelected,
  onSelect,
}: ColorBubbleProps) => {
  const isBorder = colorClass.startsWith("border-");

  return (
    <Button
      variant="ghost"
      size="icon"
      // Responsive bubble size
      className={cn(
        "w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0 shadow-lg",
        isSelected && "ring-2 ring-ring ring-offset-2 ring-offset-card"
      )}
      onClick={() => onSelect(colorClass)}
      aria-label={`Select color ${colorClass}`}
      aria-pressed={isSelected}
    >
      <div
        className={cn(
          "w-full h-full rounded-full",
          isBorder ? `border-4 ${colorClass}` : colorClass
        )}
      />
    </Button>
  );
};

export default memo(ColorBubble);
