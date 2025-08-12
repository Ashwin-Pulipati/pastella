// components/Catppuccin/CatppuccinColorGrid.tsx
import PastelsCard from "@/components/Pastels/PastelCard";
import React from "react";

interface CatppuccinColorGridProps {
  themeName: string;
  colorsObject: Record<string, string>;
}

const CatppuccinColorGrid = ({
  themeName,
  colorsObject,
}: CatppuccinColorGridProps) => (
  <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {Object.entries(colorsObject).map(([name, hex]) => (
      <PastelsCard key={`${themeName}-${name}`} color={{ name, hex }} />
    ))}
  </div>
);

export default CatppuccinColorGrid;
