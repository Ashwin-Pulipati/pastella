import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import React, { memo, useCallback, useState } from "react";
import Color from "color";

const getContrastingTextColor = (hex: string): string => {
  try {
    return Color(hex).isDark() ? "#FFFFFF" : "hsl(222, 22%, 25%)";
  } catch {
    return "hsl(222, 22%, 25%)";
  }
};

const ColorSwatch = memo(function ColorSwatch({ color }: { color: string }) {
  const [copied, setCopied] = useState<boolean>(false);
  const textColor = getContrastingTextColor(color);

  const copyToClipboard = useCallback((text: string) => {
    copy(text.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <button
      className="group relative flex-1 h-16 sm:h-20 first:rounded-l-lg last:rounded-r-lg cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none focus:z-10"
      style={{ backgroundColor: color }}
      onClick={() => copyToClipboard(color)}
      aria-label={`Copy color ${color}`}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: textColor }}
      >
        <span className="font-mono text-xs font-bold drop-shadow-sm">
          {color.toUpperCase()}
        </span>
        <div className="absolute top-2 right-2">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </div>
      </div>
    </button>
  );
});

export default ColorSwatch;
