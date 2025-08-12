
import SolidPaletteGenerator from "@/components/SolidPalette/SolidPaletteGenerator";
import React from "react";

export default function SolidPalette() {
  return (
    <div className="relative w-full">
      {/* Decorative blobs */}
      <div className="hidden lg:block absolute top-[5%] left-[5%] h-96 w-96 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[5%] right-[5%] h-96 w-96 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute top-[25%] right-[10%] h-72 w-72 rounded-full bg-accent/10 dark:bg-accent/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[25%] left-[10%] h-72 w-72 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />

      {/* Main content container */}
      <div className="relative z-10 w-full space-y-12 md:space-y-16 px-4 py-8 sm:p-6 pb-12">
        <header className="text-center my-16 md:my-24">
          <h1 className="font-special tracking-widest text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text-clip bg-gradient py-1.5">
            Solid Palettes
          </h1>
          <p className="mt-4 text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            An interstellar journey through whimsical and futuristic color
            schemes.
          </p>
        </header>

        <SolidPaletteGenerator />
      </div>
    </div>
  );
}
