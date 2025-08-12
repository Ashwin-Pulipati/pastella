"use client";

import copy from "copy-to-clipboard";
import { Clipboard, RefreshCw, CheckCircle, Loader } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react"
import usePaletteGenerators from "@/hooks/usePaletteGenerators";
import {
  AiMode,
  Color as AppColor,
  GenerationStrategy,
} from "@/types/pastelPalette.types";
import { Button } from "@/components/ui/Button";
import PastelCard from "@/components/Pastels/PastelCard";
import GradientOptions, { UnifiedSettings } from "@/components/PaletteGenerator/GradientOptions";
import GeneratorControls from "@/components/PaletteGenerator/GeneratorControls";
import AiControls from "@/components/PaletteGenerator/AiControls";
import AnimationControls from "@/components/PaletteGenerator/AnimationControls";
import GradientSkeleton from "@/components/GradientPaletteGen/GradientSkeleton";
import PaletteGeneratorLayout from "@/components/PaletteGenerator/PaletteGeneratorLayout";
import Notification from "@/components/PaletteGenerator/Notification";


// --- MAIN PAGE COMPONENT ---
export default function GradientPaletteGenerator() {
  const [strategy, setStrategy] = useState<GenerationStrategy>("analogous");
  const [paletteSize, setPaletteSize] = useState<number>(3);
  const [currentPalette, setCurrentPalette] = useState<AppColor[]>([]);
  const [aiMode, setAiMode] = useState<AiMode>("chat");
  const [aiPrompt, setAiPrompt] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);
  const [settings, setSettings] = useState<UnifiedSettings>({
    style: "linear",
    linearDirection: "to right",
    customLinearAngle: 90,
    radialShape: "ellipse",
    radialPosition: "center",
    animationStyle: "linear",
    animationDuration: 5,
  });
  const [notification, setNotification] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  const { generatePalette } = usePaletteGenerators({
    strategy,
    paletteSize,
    paletteType: isAnimationEnabled ? "animated" : "gradient",
    aiMode,
    aiPrompt,
    selectedKeywords,
    setCurrentPalette,
    setGenerationCount,
    setIsGenerating,
    showNotification,
  });

  useEffect(() => {
    generatePalette();
  }, []);

  const handleCopyToClipboard = () => {
    if (isAnimationEnabled) {
      const fullCss = `
background: ${gradientCss};
background-size: 200% 200%;
animation: gradient-pan ${settings.animationDuration}s ${settings.animationStyle} infinite alternate;
`;
      copy(fullCss.trim());
      showNotification(`Animated CSS code copied!`);
    } else {
      copy(gradientCss);
      showNotification(`CSS gradient copied!`);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const gradientCss = useMemo(() => {
    if (currentPalette.length === 0) return "";
    const colors = currentPalette.map((p) => p.hex).join(", ");
    if (settings.style === "radial") {
      return `radial-gradient(${settings.radialShape} at ${settings.radialPosition}, ${colors})`;
    }
    const angleOrDirection =
      settings.linearDirection === "Custom Angle..."
        ? `${settings.customLinearAngle}deg`
        : settings.linearDirection;
    return `linear-gradient(${angleOrDirection}, ${colors})`;
  }, [currentPalette, settings]);

  const controls = (
    <div className="rounded-2xl bg-gradient p-0.5 shadow-lg">
      <div className="space-y-6 rounded-[23px] bg-card p-3 md:p-8">
        <GeneratorControls
          {...{ strategy, setStrategy, paletteSize, setPaletteSize }}
        />
        <AiControls
          {...{
            aiMode,
            setAiMode,
            aiPrompt,
            setAiPrompt,
            selectedKeywords,
            handleKeywordToggle,
          }}
        />
        
          <GradientOptions
            settings={settings}
            setSettings={setSettings}
            isAnimationEnabled={isAnimationEnabled}
            setIsAnimationEnabled={setIsAnimationEnabled}
          />

        {isAnimationEnabled && (
          <AnimationControls
            animationStyle={settings.animationStyle}
            setAnimationStyle={(style) =>
              setSettings((s) => ({ ...s, animationStyle: style }))
            }
            animationDuration={settings.animationDuration}
            setAnimationDuration={(duration) =>
              setSettings((s) => ({ ...s, animationDuration: duration }))
            }
          />
        )}

        <Button
          variant="gradient"
          size="lg"
          onClick={generatePalette}
          disabled={isGenerating}
          className="mt-8 w-full flex items-center justify-center gap-3 py-6 rounded-full font-bold text-lg"
        >
          {isGenerating ? <Loader className="animate-spin" /> : <RefreshCw />}
          {isAnimationEnabled ? "Generate Animation" : "Generate Gradient"}
        </Button>
      </div>
    </div>
  );

  const mainContent = (
    <div key={generationCount} className="space-y-8">
      {isGenerating ? (
        <GradientSkeleton />
      ) : (
        <div className="rounded-2xl bg-gradient p-0.5 animate-pop-in shadow-lg">
          <div className="space-y-8 rounded-[23px] bg-card p-3 md:p-8">
            <button
              className="relative w-full h-72 rounded-xl cursor-pointer group overflow-hidden"
              style={
                {
                  backgroundImage: gradientCss,
                  ...(isAnimationEnabled && {
                    backgroundSize: "200% 200%",
                    animation: `gradient-pan ${settings.animationDuration}s ${settings.animationStyle} infinite alternate`,
                  }),
                } as React.CSSProperties
              }
              onClick={handleCopyToClipboard}
            >
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <span className="flex items-center gap-2 text-primary-foreground font-semibold tracking-wider">
                  {isCopied ? (
                    <CheckCircle size={18} className="text-success" />
                  ) : (
                    <Clipboard size={18} />
                  )}
                  {isCopied
                    ? "Copied!"
                    : isAnimationEnabled
                    ? "Copy Animated CSS"
                    : "Copy CSS"}
                </span>
              </div>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {currentPalette.map((color, index) => (
                <div
                  key={`${color.hex}-${index}`}
                  className="animate-pop-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <PastelCard color={color} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <PaletteGeneratorLayout
        title={
          isAnimationEnabled
            ? "Animated Gradient Generator"
            : "Gradient Palette Generator"
        }
        description={
          isAnimationEnabled
            ? "Create living, breathing animated gradients for eye-catching UIs."
            : "Design stunning gradients and generate the perfect blend for your project."
        }
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
