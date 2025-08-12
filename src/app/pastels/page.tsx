"use client";

import PastelSection from "@/components/Pastels/PastelSection";
import { ColorConverterCalculator } from "@/components/Pastels/ColorConverterCalculator";
import { pastelGroups } from "@/constants/pastels.constants";

export default function Pastels() {
  const groups = Object.entries(pastelGroups);

  return (
    <div className="relative w-full">
      {/* Background Blobs */}
      <div className="hidden lg:block absolute top-[5%] left-[5%] h-96 w-96 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[5%] right-[5%] h-96 w-96 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute top-[25%] right-[10%] h-72 w-72 rounded-full bg-accent/10 dark:bg-accent/20 blur-3xl -z-10" />
      <div className="hidden lg:block absolute bottom-[25%] left-[10%] h-72 w-72 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />

      {/* Main content container */}
      <div className="relative w-full space-y-12 px-4 py-8 sm:p-6 md:py-12">
        <header className="text-center my-16 md:my-24">
          <h1 className="gradient-text-clip py-1.5 bg-gradient font-special tracking-widest capitalize text-4xl sm:text-5xl md:text-6xl font-bold">
            Dream in Pastels
          </h1>
          <p className="mt-4 text-md sm:text-lg text-muted-foreground font-body tracking-wide max-w-2xl mx-auto">
            Explore a curated collection of futuristic pastels with playful
            tones designed to spark imagination and creativity.
          </p>
        </header>

        {groups.map(([groupKey, colors]) => (
          <div className="max-w-7xl mx-auto" key={groupKey}>
            <PastelSection groupKey={groupKey} colors={colors} />
          </div>
        ))}

        <div className="max-w-7xl mx-auto">
          <ColorConverterCalculator />
        </div>
      </div>
    </div>
  );
}
