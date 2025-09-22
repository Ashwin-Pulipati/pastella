"use client";

import CatppuccinThemeSection from "@/components/Catppuccin/BaseColorThemeSection";
import { ColorConverterCalculator } from "@/components/Pastels/ColorConverterCalculator";
import { catppuccinHex } from "@/constants/catppuccin.constants";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

// Main Page Component
export default function Catppuccin() {
  const baseThemes = Object.entries(catppuccinHex);

  return (
    <div className="relative w-full">
      {/* Decorative blobs */}
      <div className="hidden lg:block absolute top-[5%] left-[5%] h-96 w-96 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[5%] right-[5%] h-96 w-96 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute top-[25%] right-[10%] h-72 w-72 rounded-full bg-accent/10 dark:bg-accent/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[25%] left-[10%] h-72 w-72 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />

      {/* Main container */}
      <div className="relative z-10 w-full space-y-12 md:space-y-16 px-4 py-8 sm:p-6 pb-12">
        <header className="text-center my-16 md:my-24">
          <h1 className="gradient-text-clip py-1.5 bg-gradient font-special tracking-widest capitalize text-4xl sm:text-5xl md:text-6xl font-bold">
            Catppuccin Palettes
          </h1>
          <p className="mt-4 text-md sm:text-lg text-muted-foreground font-body tracking-wide max-w-2xl mx-auto">
            The four core flavors of the Catppuccin theme. A soothing,
            low-contrast palette for developers, writers, and creators. For
            detailed information, visit{" "}
            <Link
              href="https://catppuccin.com/palette"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Official Catppuccin Palette
              <ExternalLink className="h-4 w-4" />
            </Link>
            .
          </p>
        </header>

        <div className="space-y-16 md:space-y-24">
          {baseThemes.map(([themeName, colorsObject]) => (
            <CatppuccinThemeSection
              key={themeName}
              themeName={themeName}
              colorsObject={colorsObject}
            />
          ))}
        </div>

        <ColorConverterCalculator />
      </div>
    </div>
  );
}
