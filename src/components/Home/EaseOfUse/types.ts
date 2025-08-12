// components/Home/EaseOfUse/types.ts
import { ReactNode } from "react";

export interface StepData {
  step: number;
  icon: ReactNode;
  title: string;
  description: string[];
}

export interface StepStyle {
  iconBg: string;
  iconText: string;
  check: string;
  dot: string;
  ring: string;
}
