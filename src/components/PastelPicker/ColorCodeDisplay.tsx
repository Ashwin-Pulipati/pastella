import { ColorCodeDisplayProps } from "@/components/PastelPicker/types";
import { Button } from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import { CheckCircle2, ClipboardCopy } from "lucide-react";
import { memo, useCallback, useState } from "react";

const ColorCodeDisplay = ({ label, value }: ColorCodeDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const text = value.startsWith("~") ? value.slice(2) : value;
    try {
      // A more modern and secure way to copy to clipboard
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [value]);

  return (
    // This container stacks vertically on mobile and horizontally on larger screens.
    <div
      className={cn(
        "flex w-full items-start justify-between text-foreground",
        "flex-col gap-2 sm:flex-row sm:items-center"
      )}
    >
      <span className="font-bold text-md font-sans">{label}</span>
      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
        {/* This allows long color codes to be scrolled horizontally instead of breaking the layout */}
        <p className="text-sm text-foreground font-body font-medium bg-muted rounded-lg px-3 py-1.5 whitespace-nowrap">
          {value}
        </p>
        <Tooltip text={copied ? "Copied!" : "Copy"}>
          <Button
            variant={copied ? "success" : "secondary"}
            size="icon"
            onClick={copy}
            aria-label={`Copy ${label}`}
            // flex-shrink-0 prevents the button from being squished
            className="w-9 h-9 flex-shrink-0"
          >
            {copied ? <CheckCircle2 size={16} /> : <ClipboardCopy size={16} />}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default memo(ColorCodeDisplay);
