// catpuccin-tailwind/page.tsx
"use client";

import CatppuccinTailwindThemeSection from "@/components/Catppuccin/TailwindThemeSection";
import { ColorConverterCalculator } from "@/components/Pastels/ColorConverterCalculator";
import { catpuccinTailwindCSSDaisyUI } from "@/constants/catpuccin.constants";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CatpuccinShades() {
  const shadePalettes = Object.entries(catpuccinTailwindCSSDaisyUI);

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
            Catppuccin Shade Palettes
          </h1>
          <p className="mt-4 text-md sm:text-lg text-muted-foreground font-body tracking-wide max-w-3xl mx-auto">
            The complete shade system for each Catppuccin flavor. These palettes
            provide a full range of tints and tones, ensuring consistency when
            building detailed user interfaces. For detailed information, visit{" "}
            <Link
              href="https://tailwindcss.catppuccin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Official Tailwind CSS Plugin
              <ExternalLink className="h-4 w-4" />
            </Link>
            .
          </p>
        </header>

        <div className="space-y-16 md:space-y-24">
          {shadePalettes.map(([themeName, colorsObject]) => (
            <CatppuccinTailwindThemeSection
              key={`${themeName}-shades`}
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
