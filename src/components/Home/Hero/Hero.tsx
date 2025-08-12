import { Button } from "@/components/ui/Button";
import { Sparkles, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full text-center overflow-hidden">
      {/* Background image and gradient overlay */}
      <Image
        src="/hero-image.jpg"
        alt="Pastella background"
        fill
        className="object-cover z-[-2] opacity-80"
        priority // Add priority to preload this large, above-the-fold image
      />
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-background/20 to-background" />
      {/* Decorative pulses are now hidden on mobile to reduce clutter */}
      <div className="hidden md:block absolute top-30 left-30 w-10 h-10 rounded-full bg-primary/30 animate-pulse"></div>
      <div className="hidden md:block absolute top-40 right-20 w-12 h-12 rounded-full bg-accent/30 animate-pulse delay-1000"></div>
      <div className="hidden md:block absolute bottom-16 left-14 w-20 h-20 rounded-full bg-secondary/30 animate-pulse delay-500"></div>
      {/* Content container with responsive padding */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-32 sm:py-40 md:py-48">
        <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-muted/50 px-4 py-2 shadow">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            AI-Powered Color Magic
          </span>
        </div>

        {/* Heading with responsive font sizes */}
        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          <span className="gradient-text-clip bg-gradient font-special tracking-widest opacity-90">
            Create Beautiful Pastels
          </span>
        </h1>

        {/* Paragraph is already responsive, no changes needed */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground md:text-xl">
          Discover, generate, and curate stunning pastel color palettes with AI.
          Perfect for designers, artists, and anyone who loves beautiful colors.
        </p>

        {/* Button container is already responsive, no changes needed */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={"/solid-palette-gen"}>
            <Button variant="gradient" size="lg">
              <Wand2 size={20} className="mr-2" />
              Start Generating
            </Button>
          </Link>
          <Link href={"/solid-palette"}>
            <Button variant="outline" size="lg">
              Explore Palettes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
