// constants/solid-palettes.constants.ts
// Assuming these are imported from the original constants
import {
  pastelGroups,
  solidPalettesSize2,
  solidPalettesSize3,
  solidPalettesSize4,
  solidPalettesSize5,
  solidPalettesSize6,
  solidPalettesSize7,
} from "@/constants/pastels.constants";

const colorHexMap = new Map<string, { name: string; group: string }>();
for (const group in pastelGroups) {
  for (const color of pastelGroups[group]) {
    colorHexMap.set(color.hex.toLowerCase(), { name: color.name, group });
  }
}

const getColorDetails = (hex: string): { name: string; group: string } => {
  return (
    colorHexMap.get(hex.toLowerCase()) || { name: "Unknown", group: "Unknown" }
  );
};

export interface Palette {
  id: number;
  type: string;
  colors: string[];
  colorNames: string[];
  colorGroups: string[];
}

export const allPalettes: Palette[] = [
  ...solidPalettesSize2,
  ...solidPalettesSize3,
  ...solidPalettesSize4,
  ...solidPalettesSize5,
  ...solidPalettesSize6,
  ...solidPalettesSize7,
].map((p, i) => {
  const details = p.colors.map(getColorDetails);
  return {
    ...p,
    id: i,
    colorNames: details.map((d) => d.name),
    colorGroups: [...new Set(details.map((d) => d.group))],
  };
});

export const SIZES: number[] = [
  ...new Set(allPalettes.map((p) => p.colors.length)),
].sort((a, b) => a - b);

export const TYPES: string[] = [...new Set(allPalettes.map((p) => p.type))];
