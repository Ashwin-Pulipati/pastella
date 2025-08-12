// pastel-picker/page.tsx
"use client";

import React from "react";
import ControlsPanel from "@/components/PastelPicker/ControlsPanel";
import PreviewPanel from "@/components/PastelPicker/PreviewPanel";
import { usePastelPicker } from "@/hooks/usePastelPicker";

const PastelPlaygroundPage: React.FC = () => {
  const {
    view,
    setView,
    selectedPaletteColor,
    setSelectedPaletteColor,
    customColor,
    setCustomColor,
    activeHsl,
    colorFormats,
    previewStyle,
  } = usePastelPicker();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center font-sans pb-24 px-4">
      {/* Background orbs are now hidden on smaller screens */}
      <div className="hidden lg:block absolute top-[5%] left-[5%] h-96 w-96 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[5%] right-[5%] h-96 w-96 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute top-[25%] right-[10%] h-72 w-72 rounded-full bg-accent/10 dark:bg-accent/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[25%] left-[10%] h-72 w-72 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />

      <header className="text-center mb-12 mt-28">
        {/* Responsive heading */}
        <h1 className="gradient-text-clip bg-gradient py-1.5 font-special tracking-widest capitalize text-4xl sm:text-5xl md:text-6xl font-bold mt-5">
          Pastel Playground
        </h1>
        {/* Responsive subheading */}
        <h2 className="mt-4 text-md sm:text-lg text-muted-foreground max-w-3xl mx-auto font-body tracking-wide">
          Discover the softer side of the spectrum.
        </h2>
      </header>
      {/* Removed fixed height to be responsive to content */}
      <div className="relative w-full max-w-6xl h-auto rounded-3xl p-2 sm:p-4 md:p-6 transition-all duration-300 bg-card/50 backdrop-blur-sm border border-border shadow-lg">
        {/* The flex-col md:flex-row handles the main panel stacking */}
        <div className="relative flex h-full flex-col gap-4 md:flex-row md:gap-6">
          <PreviewPanel
            previewStyle={previewStyle}
            activeHsl={activeHsl}
            colorFormats={colorFormats}
          />
          <ControlsPanel
            view={view}
            setView={setView}
            selectedPaletteColor={selectedPaletteColor}
            setSelectedPaletteColor={setSelectedPaletteColor}
            customColor={customColor}
            setCustomColor={setCustomColor}
          />
        </div>
      </div>
    </div>
  );
};

export default PastelPlaygroundPage;
