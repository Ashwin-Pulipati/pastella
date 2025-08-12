import { Color, GenerationStrategy, LinearDirection } from "@/types/pastelPalette.types";
import { pastelGroups } from "./pastels.constants";

export const styleKeywords = [
  "dreamy",
  "poppy",
  "futuristic",
  "beautiful",
  "modern",
  "colorful",
  "soft-glow",
  "glassmorphism",
  "neobrutalism",
  "minimal",
  "vibrant",
  "whimsical",
  "playful",
  "aesthetic",
  "pastel",
  "iridescent",
  "holographic",
  "neumorphism",
  "high-contrast",
  "organic",
  "cosmic",
  "cyberpunk",
  "vaporwave",
  "clean",
  "elegant",
  "blurred-backgrounds",
  "soft-shadows",
  "layered-depth",
  "sleek",
  "glossy",
  "airy",
  "gradient-rich",
  "dynamic",
  "ambient",
  "expressive",
  "tactile",
  "immersive",
];

export const allColors: Color[] = Object.values(pastelGroups).flat();
export const initialUserColors = Array(6).fill({ type: "predefined", value: "" });

export const directions: LinearDirection[] = [
     "to top right",
     "to right",
     "to bottom right",
     "to bottom",
     "to bottom left",
     "to left",
     "to top left",
];


export const strategyOptions: { id: GenerationStrategy; label: string }[] = [
  { id: "analogous", label: "Analogous" },
  { id: "monochromatic", label: "Mono" },
  { id: "complementary", label: "Complementary" },
  { id: "triadic", label: "Triadic" },
];