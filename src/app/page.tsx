"use client";

import React from "react";
import { Hero } from "@/components/Home/Hero/Hero";
import Features from "@/components/Home/Features/Features";
import Harmonies from "@/components/Home/Harmonies/Harmonies";
import EaseOfUse from "@/components/Home/EaseOfUse/EaseOfUse";
import { cn } from "@/lib/utils"; // Assumes cn utility is available

// A wrapper for consistent, RESPONSIVE section styling.
const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      // This combination of responsive padding ensures proper spacing on all devices
      "w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8",
      className
    )}
  >
    {children}
  </section>
);

export default function Home() {
  return (
    <main className="relative z-10 w-full flex flex-col items-center bg-background">
      <Hero />
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient [animation-duration:20s]" />
      <Section className="pt-12 md:pt-16">
        <Features />
      </Section>
      <Section className="py-8 md:py-12">
        <EaseOfUse />
      </Section>
      <Section className="pb-12 md:pb-16">
        <Harmonies />
      </Section>
    </main>
  );
}
