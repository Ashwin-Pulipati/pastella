export type Color = { name: string; hex: string };
export type UserColor = { type: "predefined" | "custom"; value: string };
export type HSLColor = { h: number; s: number; l: number };
export type RGBColor = { r: number; g: number; b: number };
export type PaletteType = "solid" | "gradient" | "animated";
export type GenerationMethod = "curated" | "ai" | "scratch";
export type AiMode = "keywords" | "chat";
export interface GradientSettings {
  style: GradientStyle;
  direction: LinearDirection;
  shape: RadialShape;
  position: RadialPosition;
  isAnimated: boolean;
  duration: number;
  timing: AnimationTiming;
}
export type GenerationStrategy =
  | "analogous"
  | "monochromatic"
  | "complementary"
  | "triadic";

export type GradientStyle = "linear" | "radial";

export type LinearDirection =
  | "to right"
  | "to bottom right"
  | "to bottom"
  | "to bottom left"
  | "to left"
  | "to top left"
  | "to top"
  | "to top right"
  |"Custom Angle...";

export type RadialShape = "ellipse" | "circle";

export type RadialPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

export type AnimationTiming = "linear" | "ease" | "ease-in" | "ease-out";
