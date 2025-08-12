// components/SolidPalettes/PaletteList.tsx
import { Palette } from "@/constants/solid-palettes.constants";
import { Loader } from "lucide-react";
import React from "react";
import PaletteCard from "./PaletteCard";

interface Props {
  isLoading: boolean;
  palettes: Palette[];
  visibleCount: number;
}

const PaletteList = ({ isLoading, palettes, visibleCount }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 gap-4">
        <Loader className="animate-spin text-primary" size={40} />
        <p className="text-xl text-muted-foreground">Searching the cosmos...</p>
      </div>
    );
  }

  if (palettes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">
          No palettes match your query.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {palettes.slice(0, visibleCount).map((palette) => (
        <PaletteCard key={palette.id} palette={palette} />
      ))}
    </div>
  );
};

export default PaletteList;
