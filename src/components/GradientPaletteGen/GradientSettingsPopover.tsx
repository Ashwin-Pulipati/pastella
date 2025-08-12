"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { MoreHorizontal, PaletteIcon, Wind } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import NumberStepper from "@/components/ui/NumberStepper";
import { GradientSettings } from "./GradientCard";

const toSentenceCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const GradientSettingsPopover = memo(
  ({
    settings,
    setSettings,
    isOpen,
    setIsOpen,
  }: {
    settings: GradientSettings;
    setSettings: React.Dispatch<React.SetStateAction<GradientSettings>>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }) => {
    const [activeTab, setActiveTab] = useState("style");
    const popoverRef = useRef<HTMLDivElement>(null);

    // This is a generic function that correctly links the key and value types
    const handleSettingChange = useCallback(
      <K extends keyof GradientSettings>(
        key: K,
        value: GradientSettings[K]
      ) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
      },
      [setSettings]
    );

    const handleTabChange = useCallback(
      (tab: "style" | "animation") => {
        setActiveTab(tab);
        handleSettingChange("isAnimated", tab === "animation");
      },
      [handleSettingChange]
    );

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    const linearDirections = [
      "to right",
      "to bottom right",
      "to bottom",
      "to bottom left",
      "to left",
      "to top left",
      "to top",
      "to top right",
    ];
    const radialPositions = [
      "center",
      "top",
      "bottom",
      "left",
      "right",
      "top left",
      "top right",
      "bottom left",
      "bottom right",
    ];
    const animationTimings = ["linear", "ease", "ease-in", "ease-out"];

    return (
      <div className="relative" ref={popoverRef}>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreHorizontal />
        </Button>
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 rounded-xl bg-card shadow-lg border border-border z-50 p-4">
            <div className="flex gap-2 border-b border-border mb-4">
              <button
                onClick={() => handleTabChange("style")}
                className={cn(
                  "tab-trigger",
                  activeTab === "style" && "tab-trigger-active"
                )}
              >
                <PaletteIcon size={16} /> Style
              </button>
              <button
                onClick={() => handleTabChange("animation")}
                className={cn(
                  "tab-trigger",
                  activeTab === "animation" && "tab-trigger-active"
                )}
              >
                <Wind size={16} /> Animation
              </button>
            </div>

            {activeTab === "style" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Style
                  </label>
                  <Dropdown
                    id="style-dropdown"
                    label={toSentenceCase(settings.style)}
                    items={[
                      {
                        id: "linear",
                        label: "Linear",
                        onClick: () => handleSettingChange("style", "linear"),
                      },
                      {
                        id: "radial",
                        label: "Radial",
                        onClick: () => handleSettingChange("style", "radial"),
                      },
                    ]}
                  />
                </div>
                {settings.style === "linear" ? (
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">
                      Direction
                    </label>
                    <Dropdown
                      id="direction-dropdown"
                      label={toSentenceCase(settings.direction)}
                      items={linearDirections.map((dir) => ({
                        id: dir,
                        label: toSentenceCase(dir),
                        onClick: () => handleSettingChange("direction", dir),
                      }))}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">
                        Shape
                      </label>
                      <Dropdown
                        id="shape-dropdown"
                        label={toSentenceCase(settings.shape)}
                        items={[
                          {
                            id: "ellipse",
                            label: "Ellipse",
                            onClick: () =>
                              handleSettingChange("shape", "ellipse"),
                          },
                          {
                            id: "circle",
                            label: "Circle",
                            onClick: () =>
                              handleSettingChange("shape", "circle"),
                          },
                        ]}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">
                        Position
                      </label>
                      <Dropdown
                        id="position-dropdown"
                        label={toSentenceCase(settings.position)}
                        items={radialPositions.map((pos) => ({
                          id: pos,
                          label: toSentenceCase(pos),
                          onClick: () => handleSettingChange("position", pos),
                        }))}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "animation" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Duration (s)
                  </label>
                  <NumberStepper
                    value={settings.duration}
                    onChange={(val) => handleSettingChange("duration", val)}
                    min={2}
                    max={20}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Easing
                  </label>
                  <Dropdown
                    id="easing-dropdown"
                    label={toSentenceCase(settings.timing)}
                    items={animationTimings.map((t) => ({
                      id: t,
                      label: toSentenceCase(t),
                      onClick: () => handleSettingChange("timing", t),
                    }))}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
GradientSettingsPopover.displayName = "GradientSettingsPopover";

export default GradientSettingsPopover;
