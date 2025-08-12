import { useState, useMemo } from "react";
import { HSLColor } from "@/types/pastelPalette.types";
import {
  getClosestTailwindColor,
  pastelBubbleFills,
  tailwindColors,
} from "@/constants/pastelPicker.constants";
import { hslToRgb, rgbToCmyk, rgbToHex, rgbToOklch } from "@/lib/colors.utils";

export const usePastelPicker = () => {
  const [view, setView] = useState<"creator" | "palette">("creator");
  const [selectedPaletteColor, setSelectedPaletteColor] = useState<string>(
    pastelBubbleFills[0]
  );
  const [customColor, setCustomColor] = useState<HSLColor>({
    h: 240,
    s: 75,
    l: 86,
  });

  const activeHsl = useMemo<HSLColor>(() => {
    if (view === "creator") {
      return customColor;
    }
    const colorName = selectedPaletteColor.replace(
      /^(bg|border)-|-(\d+)$/g,
      ""
    );
    if (tailwindColors[colorName]) {
      return tailwindColors[colorName];
    }
    return customColor;
  }, [view, customColor, selectedPaletteColor]);

  const isBorderView =
    view === "palette" && selectedPaletteColor.startsWith("border-");

  const colorFormats = useMemo(() => {
    const { h, s, l } = activeHsl;
    const { r, g, b } = hslToRgb({ h, s, l });
    const hex = rgbToHex({ r, g, b });
    const [c, m, y, k] = rgbToCmyk({ r, g, b });
    const [oL, oC, oH] = rgbToOklch({ r, g, b });

    const tailwind =
      view === "creator"
        ? getClosestTailwindColor(h, s, l)
        : selectedPaletteColor;

    return {
      hex,
      rgb: `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
      rgba: `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 1)`,
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      cmyk: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`,
      oklch: `oklch(${oL.toFixed(3)} ${oC.toFixed(3)} ${oH.toFixed(2)})`,
      css: isBorderView ? `border-color: ${hex};` : `background-color: ${hex};`,
      tailwind,
    };
  }, [activeHsl, view, selectedPaletteColor, isBorderView]);

  const previewStyle = useMemo(
    () => ({
      background: isBorderView ? "transparent" : colorFormats.hex,
      border: isBorderView ? `8px solid ${colorFormats.hex}` : undefined,
    }),
    [colorFormats.hex, isBorderView]
  );

  return {
    view,
    setView,
    selectedPaletteColor,
    setSelectedPaletteColor,
    customColor,
    setCustomColor,
    activeHsl,
    colorFormats,
    previewStyle,
  };
};
