"use client";

import Dropdown from "@/components/ui/Dropdown";
import NumberStepper from "@/components/ui/NumberStepper";
import { strategyOptions } from "@/constants/pastelPalette.constants";
import { GenerationStrategy } from "@/types/pastelPalette.types";

interface GeneratorControlsProps {
  readonly strategy: GenerationStrategy;
  readonly setStrategy: (strategy: GenerationStrategy) => void;
  readonly paletteSize: number;
  readonly setPaletteSize: (size: number) => void;
}

export default function GeneratorControls({
  strategy,
  setStrategy,
  paletteSize,
  setPaletteSize,
}: GeneratorControlsProps) {
  const harmonyItems = strategyOptions.map((opt) => ({
    id: opt.id,
    label: opt.label,
    onClick: () => setStrategy(opt.id),
  }));

  const currentStrategyLabel =
    strategyOptions.find((opt) => opt.id === strategy)?.label ||
    "Select Harmony";

  return (
    <div className="w-full rounded-2xl border border-border shadow">
      <div className="w-full space-y-4 rounded-[15px] bg-card p-6">
        <div>
          <h3 className="mb-4 text-lg sm:text-xl font-bold font-sans text-card-foreground">
            Palette Controls
          </h3>
          {/* Main change: Flex container with a responsive layout */}
          <div className="flex flex-col gap-4">
            {/* Control Group 1 */}
            <div className="flex-1">
              <div className="relative z-10 flex items-center justify-between">
                <label
                  htmlFor="colorHarmony"
                  className="text-sm font-medium text-foreground"
                >
                  Color Harmony
                </label>
                <Dropdown
                  id="colorHarmony"
                  label={currentStrategyLabel}
                  items={harmonyItems}
                  className="text-sm"
                />
              </div>
            </div>
            {/* Control Group 2 */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="paletteSize"
                  className="text-sm font-medium text-foreground"
                >
                  Palette Size
                </label>
                <NumberStepper
                  id="paletteSize"
                  value={paletteSize}
                  onChange={setPaletteSize}
                  min={2}
                  max={7}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
