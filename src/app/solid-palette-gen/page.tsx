"use client";

import AiControls from "@/components/PaletteGenerator/AiControls";
import GeneratorControls from "@/components/PaletteGenerator/GeneratorControls";
import Notification from "@/components/PaletteGenerator/Notification";
import PaletteGeneratorLayout from "@/components/PaletteGenerator/PaletteGeneratorLayout";
import PaletteCard from "@/components/SolidPalette/PaletteCard";
import { Button } from "@/components/ui/Button";
import { Palette } from "@/constants/solid-palettes.constants";
import usePaletteGenerators from "@/hooks/usePaletteGenerators";
import { AiMode, Color, GenerationStrategy } from "@/types/pastelPalette.types";
import { Loader, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";


// --- Sub-components for a Cleaner, More Maintainable Structure ---

/**
 * @description A placeholder component to guide the user when no palette has been generated yet.
 */
const InitialPrompt = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 h-full rounded-2xl bg-card/50">
    <Sparkles className="w-12 h-12 mb-4 text-secondary" />
    <h3 className="font-bold text-2xl text-card-foreground">
      Let&apos;s Create a Palette
    </h3>
    <p className="text-muted-foreground mt-2">
      Use the controls on the left to generate your first color palette.
    </p>
  </div>
);

/**
 * @description A loading skeleton shown while a new palette is being generated.
 */
const PaletteSkeleton = () => (
  <div className="w-full max-w-sm mx-auto p-4 rounded-2xl bg-card/50 animate-pulse">
    <div className="h-48 md:h-64 rounded-xl bg-muted"></div>
    <div className="mt-4 h-6 w-3/4 rounded-md bg-muted"></div>
  </div>
);

// --- Main Component ---

export default function SolidPaletteGenerator() {
  // --- State Management ---
  const [strategy, setStrategy] = useState<GenerationStrategy>("analogous");
  const [paletteSize, setPaletteSize] = useState<number>(2);
  const [currentPalette, setCurrentPalette] = useState<Color[]>([]);

  const [aiMode, setAiMode] = useState<AiMode>("chat");
  const [aiPrompt, setAiPrompt] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const [notification, setNotification] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  // --- Utility Functions ---
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  // --- Custom Hook for Palette Generation Logic ---
  const { generatePalette } = usePaletteGenerators({
    strategy,
    paletteSize,
    paletteType: "solid",
    aiMode,
    aiPrompt,
    selectedKeywords,
    setCurrentPalette,
    setGenerationCount,
    setIsGenerating,
    showNotification,
  });

  // --- Effects ---
  useEffect(() => {
    generatePalette();
  }, []); // Runs only once on mount.

  // --- Event Handlers ---
  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  // --- Type-Safe Palette Transformation ---
  const paletteForCard: Palette | null =
    currentPalette.length > 0
      ? {
          id: generationCount,
          type: strategy,
          colors: currentPalette.map((c) => c.hex),
          colorNames: [], // Not generated here
          colorGroups: [], // Not generated here
        }
      : null;

  // --- Render Logic ---
  const controls = (
    <div className="rounded-2xl bg-gradient p-0.5 shadow-lg">
      <div className="space-y-6 rounded-[23px] bg-card p-3 md:p-8">
        <GeneratorControls
          strategy={strategy}
          setStrategy={setStrategy}
          paletteSize={paletteSize}
          setPaletteSize={setPaletteSize}
        />
        <AiControls
          aiMode={aiMode}
          setAiMode={setAiMode}
          aiPrompt={aiPrompt}
          setAiPrompt={setAiPrompt}
          selectedKeywords={selectedKeywords}
          handleKeywordToggle={handleKeywordToggle}
        />
        <Button
          variant="gradient"
          size="lg"
          onClick={generatePalette}
          disabled={isGenerating}
          className="mt-8 w-full flex items-center justify-center gap-3 py-6 rounded-full font-bold text-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader className="animate-spin" /> : <RefreshCw />}
          Generate Palette
        </Button>
      </div>
    </div>
  );

  const mainContent = (
    <div key={generationCount} className="w-full max-w-7xl mx-auto">
      {isGenerating ? (
        <PaletteSkeleton />
      ) : paletteForCard ? (
        <div className="rounded-2xl bg-gradient p-0.5 shadow-lg animate-pop-in">
          <div className="rounded-[23px] bg-card p-3 md:p-8">
            <PaletteCard palette={paletteForCard} />
          </div>
        </div>
      ) : (
        <InitialPrompt />
      )}
    </div>
  );

  return (
    <>
      <PaletteGeneratorLayout
        title="Solid Palette Generator"
        description="Create beautiful solid color palettes, powered by AI. Choose a harmony and let your ideas come to life."
        controls={controls}
        mainContent={mainContent}
      />
      <Notification
        message={notification || ""}
        isVisible={notification !== null}
      />
    </>
  );
}
