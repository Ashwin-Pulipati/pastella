// gradient-palette/page.tsx
"use client";

import GradientPaletteGenerator from "@/components/GradientPalette/GradientPaletteGenerator";
import React from "react";

export default function GradientPalette() {
  return (
    <div className="relative w-full bg-background">
      {/* Decorative blobs */}
      <div className="hidden lg:block absolute top-[5%] left-[5%] h-96 w-96 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[5%] right-[5%] h-96 w-96 rounded-full bg-secondary/10 blur-3xl -z-10" />
      <div className="hidden lg:block absolute top-[25%] right-[10%] h-72 w-72 rounded-full bg-accent/10 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[25%] left-[10%] h-72 w-72 rounded-full bg-primary/10 blur-3xl -z-10" />

      {/* Main container */}
      <div className="relative z-10 w-full space-y-8 md:space-y-12 px-4 py-8 sm:p-6 pb-12">
        <header className="text-center my-16 md:my-24">
          <h1 className="font-special tracking-widest text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text-clip bg-gradient py-1.5">
            Gradient Palettes
          </h1>
          <p className="mt-4 text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            A curated collection of beautiful, ready-to-use gradients. Customize
            and animate them to fit your design perfectly.
          </p>
        </header>

        <GradientPaletteGenerator />
      </div>
    </div>
  );
}
