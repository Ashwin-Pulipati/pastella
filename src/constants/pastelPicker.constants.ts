import { TailwindColors } from "@/components/PastelPicker/types";

export const tailwindColors: TailwindColors = {
  pink: { h: 330, s: 80, l: 86, name: "pink-200" },
  purple: { h: 270, s: 80, l: 86, name: "purple-200" },
  blue: { h: 210, s: 80, l: 86, name: "blue-200" },
  green: { h: 150, s: 80, l: 86, name: "green-200" },
  teal: { h: 165, s: 80, l: 80, name: "teal-200" },
  cyan: { h: 180, s: 80, l: 86, name: "cyan-200" },
  yellow: { h: 60, s: 100, l: 80, name: "yellow-200" },
  rose: { h: 345, s: 100, l: 80, name: "rose-200" },
  indigo: { h: 240, s: 80, l: 86, name: "indigo-200" },
  red: { h: 0, s: 84, l: 85, name: "red-200" },
  orange: { h: 25, s: 95, l: 85, name: "orange-200" },
  amber: { h: 40, s: 96, l: 84, name: "amber-200" },
  lime: { h: 75, s: 82, l: 82, name: "lime-200" },
  fuchsia: { h: 285, s: 81, l: 86, name: "fuchsia-200" },
  violet: { h: 259, s: 80, l: 86, name: "violet-200" },
  sky: { h: 196, s: 83, l: 84, name: "sky-200" },
  slate: { h: 215, s: 25, l: 89, name: "slate-200" },
  zinc: { h: 240, s: 6, l: 88, name: "zinc-200" },
  stone: { h: 35, s: 12, l: 88, name: "stone-200" },
  gray: { h: 220, s: 9, l: 88, name: "gray-200" },
  neutral: { h: 0, s: 0, l: 88, name: "neutral-200" },
};

export const getClosestTailwindColor = (
  h: number,
  s: number,
  l: number
): string => {
  if (s < 5 && l > 95) return "bg-white";
  if (s < 5 && l < 5) return "bg-black";
  let minDistance = Infinity;
  let closestName = "";
  for (const color in tailwindColors) {
    const tw = tailwindColors[color];
    const hueDiff = Math.min(Math.abs(h - tw.h), 360 - Math.abs(h - tw.h));
    const dist = Math.hypot(hueDiff * 0.6, (s - tw.s) * 0.3, (l - tw.l) * 0.1);
    if (dist < minDistance) {
      minDistance = dist;
      closestName = tw.name;
    }
  }
  // Important: Safelist this pattern or write full class names if used elsewhere
  return `bg-${closestName}`;
};

// ✨ FIX: Hardcode the full class names
export const pastelBubbleFills = [
  "bg-pink-200",
  "bg-purple-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-teal-200",
  "bg-cyan-200",
  "bg-yellow-100",
  "bg-rose-100",
  "bg-indigo-200",
  "bg-red-200",
  "bg-orange-200",
  "bg-amber-200",
  "bg-lime-200",
  "bg-fuchsia-200",
  "bg-violet-200",
  "bg-sky-200",
  "bg-slate-200",
  "bg-zinc-200",
  "bg-stone-200",
  "bg-gray-200",
  "bg-neutral-200",
];

export const pastelBubbleBorders = [
  "border-pink-300",
  "border-purple-300",
  "border-blue-300",
  "border-green-300",
  "border-teal-300",
  "border-cyan-300",
  "border-yellow-200",
  "border-rose-200",
  "border-indigo-300",
  "border-red-300",
  "border-orange-300",
  "border-amber-300",
  "border-lime-300",
  "border-fuchsia-300",
  "border-violet-300",
  "border-sky-300",
  "border-slate-300",
  "border-zinc-300",
  "border-stone-300",
];
