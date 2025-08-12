import React from "react";

interface PaletteGeneratorLayoutProps {
  title: string;
  description: string;
  controls: React.ReactNode;
  mainContent: React.ReactNode;
}

export default function PaletteGeneratorLayout({
  title,
  description,
  controls,
  mainContent,
}: PaletteGeneratorLayoutProps) {
  return (
    // UPDATED: Uses theme variables for background and text
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-8 font-sans antialiased pb-24">
      {/* Background Orbs using theme colors */}
      <div className="absolute top-[5%] left-[5%] h-96 w-96 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />
      <div className="absolute bottom-[5%] right-[5%] h-96 w-96 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-3xl -z-10" />
      <div className="absolute top-[25%] right-[10%] h-72 w-72 rounded-full bg-accent/10 dark:bg-accent/20 blur-3xl -z-10" />
      <div className="absolute bottom-[25%] left-[10%] h-72 w-72 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10" />

      <header className="mb-12 mt-24 text-center">
        {/* UPDATED: Uses font-special from the theme */}
        <h1 className="gradient-text-clip bg-gradient py-1.5 font-special tracking-widest text-5xl font-extrabold md:text-6xl">
          {title}
        </h1>
        {/* UPDATED: Uses muted-foreground for the description */}
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          {description}
        </p>
      </header>

      {/* Main content grid */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-5">{controls}</aside>
          <main className="lg:col-span-7">{mainContent}</main>
        </div>
      </div>
    </div>
  );
}
