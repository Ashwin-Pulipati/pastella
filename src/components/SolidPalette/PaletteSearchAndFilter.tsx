// components/SolidPalettes/PaletteSearchAndFilter.tsx

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  X,
  Layers,
  Palette as PaletteIcon,
} from "lucide-react";
import React, { useState, useCallback } from "react";
import FilterButton from "./FilterButton";

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeSize: number;
  setActiveSize: (size: number) => void;
  activeType: string;
  setActiveType: (type: string) => void;
  SIZES: number[];
  TYPES: string[];
  placeholder?: string;
  showFilters?: boolean;
  setShowFilters?: (show: boolean) => void;
  searchClassName?: string;
}

const PaletteSearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  activeSize,
  setActiveSize,
  activeType,
  setActiveType,
  SIZES,
  TYPES,
  placeholder = "Search palettes...", // Default placeholder
  showFilters: showFiltersProp,
  setShowFilters: setShowFiltersProp,
  searchClassName,
}: Props) => {
  const [showFiltersState, setShowFiltersState] = useState(false);
  const showFilters =
    setShowFiltersProp !== undefined ? showFiltersProp : showFiltersState;
  const setShowFilters =
    setShowFiltersProp !== undefined ? setShowFiltersProp : setShowFiltersState;

  const handleSizeClick = useCallback(
    (size: number) => setActiveSize(size),
    [setActiveSize]
  );
  const handleTypeClick = useCallback(
    (type: string) => setActiveType(type),
    [setActiveType]
  );

  return (
    <div
      className={cn(
        "max-w-2xl mx-auto flex flex-col gap-4 p-4 mb-12 rounded-2xl bg-card border border-border shadow",
        searchClassName
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-muted border border-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex-shrink-0"
        >
          {showFilters ? <X size={16} /> : <Filter size={16} />}
          <span className="ml-2 hidden sm:inline">Filters</span>
        </Button>
      </div>
      <div
        className={cn(
          "transition-all duration-500 ease-in-out overflow-hidden",
          showFilters ? "max-h-96 opacity-100 pt-4" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-4 border-t border-border pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-foreground flex-shrink-0">
              <Layers size={16} />
              <span className="font-semibold text-sm">Size:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                onClick={() => handleSizeClick(0)}
                isActive={activeSize === 0}
              >
                All
              </FilterButton>
              {SIZES.map((size) => (
                <FilterButton
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  isActive={activeSize === size}
                >
                  {size}
                </FilterButton>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-foreground flex-shrink-0">
              <PaletteIcon size={16} />
              <span className="font-semibold text-sm">Type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                onClick={() => handleTypeClick("All")}
                isActive={activeType === "All"}
              >
                All
              </FilterButton>
              {TYPES.map((type) => (
                <FilterButton
                  key={type}
                  onClick={() => handleTypeClick(type)}
                  isActive={activeType === type}
                  className="capitalize"
                >
                  {type.replace(/-/g, " ")}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteSearchAndFilter;
