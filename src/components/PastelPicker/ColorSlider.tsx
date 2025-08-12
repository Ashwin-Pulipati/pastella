import { ColorSliderProps } from "@/components/PastelPicker/types";
import React, { memo } from "react";

const ColorSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  gradient,
}: ColorSliderProps) => {
  return (
    // Use font-sans for the main container font
    <div className="w-full font-sans tracking-wide font-bold">
      {/* Use muted-foreground for the label to make it less prominent */}
      <label
        htmlFor={`${label}-slider`}
        className="text-muted-foreground text-sm"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={`${label}-slider`}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full neu-slider"
          // This correctly passes the dynamic gradient to the CSS variable
          style={{ "--slider-gradient": gradient } as React.CSSProperties}
        />
        {/* Use font-body for the value display */}
        <span className="ml-4 w-10 text-right font-body font-normal text-foreground">
          {value}
        </span>
      </div>
    </div>
  );
};

export default memo(ColorSlider);
