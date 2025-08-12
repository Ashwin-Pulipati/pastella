export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

export type TailwindColorData = HSLColor & { name: string };

export type TailwindColors = {
  [key: string]: TailwindColorData;
};


export type ColorBubbleProps = {
  colorClass: string;
  isSelected: boolean;
  onSelect: (color: string) => void;
};


export type ColorCodeDisplayProps = {
  label: string;
  value: string;
};

export type ColorSliderProps = {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  gradient: string;
};

export type ControlsPanelProps = {
  view: "creator" | "palette";
  setView: (v: "creator" | "palette") => void;
  selectedPaletteColor: string;
  setSelectedPaletteColor: (color: string) => void;
  customColor: HSLColor;
  setCustomColor: (color: HSLColor) => void;
};


export type ColorFormats = {
  css: string;
  tailwind: string;
  hex: string;
  rgb: string;
  rgba?: string;
  hsl: string;
  cmyk: string;
  oklch: string;
};

/**
 * The complete props for your PreviewPanel component.
 */
export interface PreviewPanelProps {
  /**
   * The inline style object for the main color preview circle.
   */
  previewStyle: {
    background: string;
    border: string | undefined;
  };

  /**
   * The active color in HSL format, used for determining text color contrast.
   */
  activeHsl: HSLColor;

  /**
   * An object containing the active color in various string formats.
   */
  colorFormats: {
    hex: string;
    rgb: string;
    rgba: string;
    hsl: string;
    cmyk: string;
    oklch: string;
    css: string;
    tailwind: string;
  };
}