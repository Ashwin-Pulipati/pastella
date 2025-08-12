// components/SolidPalettes/FilterButton.tsx
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import React, { memo, ReactNode } from "react";

interface FilterButtonProps {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
  className?: string;
}

const FilterButton = memo(function FilterButton({
  children,
  onClick,
  isActive,
  className = "",
}: FilterButtonProps) {
  return (
    <Button
      variant={isActive ? "primary" : "outline"}
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 text-sm font-semibold rounded-full",
        className
      )}
    >
      {children}
    </Button>
  );
});

export default FilterButton;
