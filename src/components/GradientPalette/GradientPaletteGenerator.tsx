// components/GradientPalettes/GradientPaletteGenerator.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import GradientPaletteList from "./GradientPaletteList";
import { useDebounce } from "@/hooks/useDebounce";
import PaletteSearchAndFilter from "../SolidPalette/PaletteSearchAndFilter";
import { allPalettes, Palette, SIZES, TYPES } from "@/constants/solid-palettes.constants";

const ITEMS_PER_PAGE = 12;

const fetchPalettesFromAI = async (
  query: string,
  filters: { activeSize: number; activeType: string }
): Promise<Palette[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

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
        )}`.toLowerCase();
        return paletteText.includes(keyword);
      });
    });
  }
  return palettes;
};

export default function GradientPaletteGenerator() {
  const [activeSize, setActiveSize] = useState<number>(0);
  const [activeType, setActiveType] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
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

  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  const handleSizeClick = useCallback(
    (size: number) => setActiveSize(size),
    []
  );
  const handleTypeClick = useCallback(
    (type: string) => setActiveType(type),
    []
  );

  return (
    <>
      <div className="z-40">
        <PaletteSearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeSize={activeSize}
          setActiveSize={handleSizeClick}
          activeType={activeType}
          setActiveType={handleTypeClick}
          SIZES={SIZES}
          TYPES={TYPES}
          placeholder="Search hex codes or types..."
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          searchClassName="bg-card/80 border border-border shadow backdrop-blur-lg"
        />
      </div>

      <main>
        <GradientPaletteList
          isLoading={isLoading}
          palettes={filteredPalettes}
          visibleCount={visibleCount}
        />
      </main>

      {!isLoading && visibleCount < filteredPalettes.length && (
        <div className="mt-12 text-center">
          <Button variant="secondary" size="lg" onClick={handleLoadMore}>
            <PlusCircle size={20} className="mr-2" /> Load More
          </Button>
        </div>
      )}
    </>
  );
}
