"use client";

import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { styleKeywords } from "@/constants/pastelPalette.constants";
import { MessageSquare, Tag } from "lucide-react";

type AiMode = "chat" | "keywords";

interface AiControlsProps {
  readonly aiMode: AiMode;
  readonly setAiMode: (mode: AiMode) => void;
  readonly aiPrompt: string;
  readonly setAiPrompt: (prompt: string) => void;
  readonly selectedKeywords: string[];
  readonly handleKeywordToggle: (keyword: string) => void;
}

export default function AiControls({
  aiMode,
  setAiMode,
  aiPrompt,
  setAiPrompt,
  selectedKeywords,
  handleKeywordToggle,
}: AiControlsProps) {
  const dropdownItems = [
    {
      id: "keywords",
      label: "Keywords",
      icon: <Tag size={16} />,
      onClick: () => setAiMode("keywords"),
    },
    {
      id: "chat",
      label: "Chat Prompt",
      icon: <MessageSquare size={16} />,
      onClick: () => setAiMode("chat"),
    },
  ];

  const currentModeLabel =
    dropdownItems.find((item) => item.id === aiMode)?.label || "Keywords";

  return (
    <div className="w-full rounded-2xl border border-border shadow">
      {/* Card now uses responsive padding */}
      <div className="w-full space-y-4 rounded-[15px] bg-card p-4 sm:p-6">
        {/* Header stacks on mobile and becomes a row on larger screens */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg sm:text-xl font-sans font-bold text-card-foreground">
            AI Controls
          </h3>
          <Dropdown
            id="ai-mode-dropdown"
            label={currentModeLabel}
            items={dropdownItems}
            className="text-sm w-full sm:w-auto"
          />
        </div>

        {/* Conditional content based on the selected AI mode */}
        {aiMode === "keywords" ? (
          <div className="space-y-3 pt-2">
            <p className="text-sm text-muted-foreground">
              Select keywords to guide the AI:
            </p>
            <div className="flex flex-wrap gap-2">
              {styleKeywords.map((keyword) => {
                const isSelected = selectedKeywords.includes(keyword);
                return (
                  <Button
                    key={keyword}
                    variant={isSelected ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handleKeywordToggle(keyword)}
                    className="text-xs"
                  >
                    {keyword}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : (
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g., 'a serene beach at sunrise'"
            className="h-24 w-full resize-none rounded-xl border border-border bg-muted p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
          />
        )}
      </div>
    </div>
  );
}
