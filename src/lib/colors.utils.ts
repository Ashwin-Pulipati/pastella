import { HSLColor, RGBColor } from "@/types/pastelPalette.types";

export const hexToRgb = (hex: string): RGBColor | null => {
  if (!/^#([A-F0-9]{3}){1,2}$/i.test(hex)) return null;

  let normalizedHex = hex.substring(1);
  if (normalizedHex.length === 3) {
    normalizedHex =
      normalizedHex[0] +
      normalizedHex[0] +
      normalizedHex[1] +
      normalizedHex[1] +
      normalizedHex[2] +
      normalizedHex[2];
  }

  return {
    r: parseInt(normalizedHex.substring(0, 2), 16),
    g: parseInt(normalizedHex.substring(2, 4), 16),
    b: parseInt(normalizedHex.substring(4, 6), 16),
  };
};

export const rgbToHex = ({ r, g, b }: RGBColor): string => {
  const toHex = (c: number) => `0${Math.round(c).toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const rgbToHsl = ({ r, g, b }: RGBColor): HSLColor => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const hslToRgb = ({ h, s, l }: HSLColor): RGBColor => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return { r: 255 * f(0), g: 255 * f(8), b: 255 * f(4) };
};

export const rgbToCmyk = ({
  r,
  g,
  b,
}: RGBColor): [number, number, number, number] => {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  const k = Math.min(c, m, y);
  if (k === 1) return [0, 0, 0, 100];
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  return [
    Math.round(c * 100),
    Math.round(m * 100),
    Math.round(y * 100),
    Math.round(k * 100),
  ];
};


export const rgbToOklch = ({ r, g, b }: RGBColor): [number, number, number] => {
  const toLinear = (c: number) => {
    const v = c / 255;
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  };
  const rL = toLinear(r),
    gL = toLinear(g),
    bL = toLinear(b);
  const x = 0.4124564 * rL + 0.3575761 * gL + 0.1804375 * bL;
  const y = 0.2126729 * rL + 0.7151522 * gL + 0.072175 * bL;
  const z = 0.0193339 * rL + 0.119192 * gL + 0.9503041 * bL;
  const x_ = Math.cbrt(x),
    y_ = Math.cbrt(y),
    z_ = Math.cbrt(z);
  const l = 0.42093636 * x_ + 0.57906364 * y_;
  const m = 0.27641324 * x_ + 0.72358676 * y_;
  const s = -0.01358348 * x_ + 0.01358348 * y_ + z_;
  const l_ = Math.cbrt(l),
    m_ = Math.cbrt(m),
    s_ = Math.cbrt(s);
  const L = 0.21045426 * l_ + 0.79361779 * m_ - 0.00407205 * s_;
  const a = 1.9779985 * l_ - 2.4285922 * m_ + 0.4505937 * s_;
  const b_ = 0.02590404 * l_ + 0.78277177 * m_ - 0.80867576 * s_;
  const C = Math.hypot(a, b_);
  let H = Math.atan2(b_, a) * (180 / Math.PI);
  if (H < 0) H += 360;
  return [L, C, H];
};
