"use client";

import Dropdown from "@/components/ui/Dropdown";
import Switch from "@/components/ui/Switch";
import {
  AnimationTiming,
  GradientStyle,
  LinearDirection,
  RadialShape,
} from "@/types/pastelPalette.types";
import React from "react";

export interface UnifiedSettings {
  style: GradientStyle;
  linearDirection: LinearDirection;
  customLinearAngle: number;
  radialShape: RadialShape;
  radialPosition: string;
  animationStyle: AnimationTiming;
  animationDuration: number;
}

interface Props {
  settings: UnifiedSettings;
  setSettings: React.Dispatch<React.SetStateAction<UnifiedSettings>>;
  isAnimationEnabled: boolean;
  setIsAnimationEnabled: (enabled: boolean) => void;
}

const GradientOptions: React.FC<Props> = ({
  settings,
  setSettings,
  isAnimationEnabled,
  setIsAnimationEnabled,
}) => {
  const {
    style,
    linearDirection,
    radialShape,
    radialPosition,
  } = settings;

  const handleSettingChange = <K extends keyof UnifiedSettings>(
    key: K,
    value: UnifiedSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const styleItems = [
    {
      id: "style-linear",
      label: "Linear",
      onClick: () => handleSettingChange("style", "linear"),
    },
    {
      id: "style-radial",
      label: "Radial",
      onClick: () => handleSettingChange("style", "radial"),
    },
  ];
  const linearDirectionItems = [
    "to right",
    "to bottom right",
    "to bottom",
    "to bottom left",
    "to left",
    "to top left",
    "to top",
    "to top right",
    "Custom Angle...",
  ].map((dir) => ({
    id: `linear-direction-${dir.replace(/\s/g, "-").toLowerCase()}`,
    label: dir,
    onClick: () =>
      handleSettingChange("linearDirection", dir as LinearDirection),
  }));
  const radialShapeItems = [
    {
      id: "radial-shape-ellipse",
      label: "Ellipse",
      onClick: () => handleSettingChange("radialShape", "ellipse"),
    },
    {
      id: "radial-shape-circle",
      label: "Circle",
      onClick: () => handleSettingChange("radialShape", "circle"),
    },
  ];
  const radialPositionItems = [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top left",
    "top right",
    "bottom left",
    "bottom right",
  ].map((pos) => ({
    id: `radial-position-${pos.replace(/\s/g, "-")}`,
    label: pos,
    onClick: () => handleSettingChange("radialPosition", pos),
  }));

  return (
    // UPDATED: Uses theme variables for the container
    <div className="w-full rounded-2xl border border-border shadow">
      <div className="w-full space-y-4 rounded-[15px] bg-card p-6">
        <div className="flex justify-between items-center flex-wrap gap-4 md:flex-nowrap">
          <h3 className="text-lg sm:text-xl font-bold font-sans text-card-foreground">
            Gradient Options
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground">
              Animate
            </span>
            <Switch
              checked={isAnimationEnabled}
              onCheckedChange={setIsAnimationEnabled}
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-border pt-4">
          <div className="relative z-50 flex items-center justify-between">
            <label
              htmlFor="gradient-style-dropdown"
              className="text-sm font-medium text-foreground"
            >
              Style
            </label>
            <Dropdown
              id="gradient-style-dropdown"
              label={style === "linear" ? "Linear" : "Radial"}
              items={styleItems}
              className="text-sm"
            />
          </div>

          {style === "linear" && (
            <div className="space-y-4 border-t border-border pt-4">
              <div className="relative z-30 flex items-center justify-between">
                <label
                  htmlFor="linear-direction-dropdown"
                  className="text-sm font-medium text-foreground"
                >
                  Direction
                </label>
                <Dropdown
                  id="linear-direction-dropdown"
                  label={linearDirection}
                  items={linearDirectionItems}
                  className="text-sm"
                />
              </div>
            </div>
          )}

          {style === "radial" && (
            <div className="space-y-4 border-t border-border pt-4">
              <div className="relative z-30 flex items-center justify-between">
                <label
                  htmlFor="radial-shape-dropdown"
                  className="text-sm font-medium text-foreground"
                >
                  Shape
                </label>
                <Dropdown
                  id="radial-shape-dropdown"
                  label={radialShape === "ellipse" ? "Ellipse" : "Circle"}
                  items={radialShapeItems}
                  className="text-sm"
                />
              </div>
              <div className="relative z-20 flex items-center justify-between">
                <label
                  htmlFor="radial-position-dropdown"
                  className="text-sm font-medium text-foreground"
                >
                  Position
                </label>
                <Dropdown
                  id="radial-position-dropdown"
                  label={radialPosition}
                  items={radialPositionItems}
                  className="text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradientOptions;
