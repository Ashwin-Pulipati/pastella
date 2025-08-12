// components/Home/Features/Features.tsx

import { cn } from "@/lib/utils";
import { ArrowRight, Layers, Palette, SwatchBook } from "lucide-react";
import Link from "next/link";
import React from "react";

type CardData = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

const cardData: CardData[] = [
  {
    href: "/solid-palette",
    icon: <Palette size={32} strokeWidth={1.5} />,
    title: "Solid Palettes",
    description: "Explore hundreds of hand-picked solid color palettes.",
  },
  {
    href: "/gradient-palette",
    icon: <Layers size={32} strokeWidth={1.5} />,
    title: "Gradient Studio",
    description: "Design and animate stunning linear and radial gradients.",
  },
  {
    href: "/catpuccin-base",
    icon: <SwatchBook size={32} strokeWidth={1.5} />,
    title: "Theme Systems",
    description: "Full theming systems like Catppuccin for professional UIs.",
  },
];

const cardStyles = [
  {
    gradient: "bg-gradient-to-br from-primary/20 to-secondary/20",
    text: "text-primary",
  },
  {
    gradient: "bg-gradient-to-br from-secondary/20 to-accent/20",
    text: "text-secondary",
  },
  {
    gradient: "bg-gradient-to-br from-accent/20 to-primary/20",
    text: "text-accent",
  },
];

const Features = () => {

  return (
    // Added responsive padding for the whole section
    <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8 xl:px-0">
      {/* Responsive heading for better scaling on mobile */}
      <h2 className="mb-6 text-center text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
        <span className="gradient-text-clip bg-gradient font-special tracking-widest">
          Features
        </span>
      </h2>

      {/* Responsive grid for better layout on tablets */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((card, index) => {
          const style = cardStyles[index % cardStyles.length];
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group block h-full transition-transform duration-300 ease-out hover:-translate-y-2"
            >
              {/* Responsive padding inside the card */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
                {/* Responsive icon size and cleaner classes with cn */}
                <div
                  className={cn(
                    "mb-6 flex items-center justify-center rounded-full",
                    "h-16 w-16 md:h-20 md:w-20",
                    style.gradient,
                    style.text
                  )}
                >
                  {card.icon}
                </div>

                <h3 className="font-sans text-2xl font-bold text-card-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 flex-grow font-body text-muted-foreground">
                  {card.description}
                </p>

                {/* Cleaner classes with cn */}
                <div
                  className={cn(
                    "mt-6 flex items-center gap-2 font-sans font-bold",
                    style.text
                  )}
                >
                  <span>Explore Feature</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
