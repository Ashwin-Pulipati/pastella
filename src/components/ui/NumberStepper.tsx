"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import React from "react";

// Define the types for the component props
type NumberStepperProps = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  id?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

const NumberStepper = ({
  value,
  onChange,
  min = 0,
  max = 10,
  id,
  className,
  ...props
}: NumberStepperProps) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full bg-interactive p-1",
        className
      )}
      {...props}
    >
      <Button
        variant="primary"
        size="icon"
        onClick={handleDecrement}
        disabled={value <= min}
        className="h-8 w-8 rounded-full"
        aria-label="Decrement"
      >
        <Minus size={16} />
      </Button>
      <span
        id={id}
        className="w-10 text-center font-mono text-base font-semibold text-on-surface"
      >
        {value}
      </span>
      <Button
        variant="primary"
        size="icon"
        onClick={handleIncrement}
        disabled={value >= max}
        className="h-8 w-8 rounded-full"
        aria-label="Increment"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default NumberStepper;
