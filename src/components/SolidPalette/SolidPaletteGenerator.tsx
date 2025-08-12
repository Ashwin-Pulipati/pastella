// components/SolidPalettes/SolidPaletteGenerator.tsx
"use client";

import { Button } from "@/components/ui/Button";
import {
  allPalettes,
  SIZES,
  TYPES,
  Palette,
} from "@/constants/solid-palettes.constants";
import { PlusCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import PaletteSearchAndFilter from "./PaletteSearchAndFilter";
import PaletteList from "./PaletteList";
import { useDebounce } from "@/hooks/useDebounce";

const ITEMS_PER_PAGE = 18;

// Mock AI fetch function
const fetchPalettesFromAI = async (
  query: string,
  filters: { activeSize: number; activeType: string }
): Promise<Palette[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const searchKeywords = query.toLowerCase().split(" ").filter(Boolean);
  let palettes = allPalettes;
  if (filters.activeSize !== 0) {
    palettes = palettes.filter((p) => p.colors.length === filters.activeSize);
  }
  if (filters.activeType !== "All") {
    palettes = palettes.filter((p) => p.type === filters.activeType);
  }
  if (searchKeywords.length > 0) {
    palettes = palettes.filter((palette) => {
      return searchKeywords.every((keyword) => {
        const paletteText = `${palette.type} ${palette.colors.join(
          " "
        )} ${palette.colorNames.join(" ")} ${palette.colorGroups.join(
          " "
        )}`.toLowerCase();
        return paletteText.includes(keyword);
      });
    });
  }
  return palettes;
};

export default function SolidPaletteGenerator() {
  const [activeSize, setActiveSize] = useState<number>(0);
  const [activeType, setActiveType] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [filteredPalettes, setFilteredPalettes] = useState<Palette[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      const results = await fetchPalettesFromAI(debouncedSearchTerm, {
        activeSize,
        activeType,
      });
      setFilteredPalettes(results);
      setVisibleCount(ITEMS_PER_PAGE);
      setIsLoading(false);
    };
    performSearch();
  }, [debouncedSearchTerm, activeSize, activeType]);

  const handleLoadMore = useCallback(
    () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE),
    []
  );

  return (
    <>
      <PaletteSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSize={activeSize}
        setActiveSize={setActiveSize}
        activeType={activeType}
        setActiveType={setActiveType}
        SIZES={SIZES}
        TYPES={TYPES}
      />

      <main>
        <PaletteList
          isLoading={isLoading}
          palettes={filteredPalettes}
          visibleCount={visibleCount}
        />
      </main>

      {!isLoading && visibleCount < filteredPalettes.length && (
        <div className="mt-12 text-center">
          <Button variant="secondary" size="lg" onClick={handleLoadMore}>
            <PlusCircle size={20} className="mr-2" />
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
