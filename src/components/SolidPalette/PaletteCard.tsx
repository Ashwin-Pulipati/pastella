// components/SolidPalettes/PaletteCard.tsx
import Tooltip from "@/components/ui/Tooltip";
import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import React, { memo, useCallback, useState } from "react";
import ColorSwatch from "./ColorSwatch";
import { Palette } from "@/constants/solid-palettes.constants";

const PaletteCard = memo(function PaletteCard({
  palette,
}: {
  palette: Palette;
}) {
  const [copied, setCopied] = useState(false);

  const copyPalette = useCallback(() => {
    const textToCopy = palette.colors.map((c) => c.toUpperCase()).join(", ");
    copy(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [palette.colors]);

  return (
    <div className="relative rounded-2xl bg-card border border-border p-4 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-extrabold font-sans text-card-foreground capitalize tracking-wider">
            {palette.type.replace(/-/g, " ")}
          </h3>
          <Tooltip text={copied ? "Copied!" : "Copy Palette"}>
            <button
              onClick={copyPalette}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Copy entire palette"
            >
              {copied ? (
                <Check size={16} className="text-success" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </Tooltip>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {palette.colors.length} Colors
        </span>
      </div>
      <div className="flex rounded-lg overflow-hidden">
        {palette.colors.map((color, index) => (
          <ColorSwatch key={`${palette.id}-${index}`} color={color} />
        ))}
      </div>
    </div>
  );
});

export default PaletteCard;