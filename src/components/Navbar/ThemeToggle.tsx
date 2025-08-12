"use client";

import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // This hook is essential to prevent a hydration mismatch error
  // The UI shouldn't be rendered until the client-side theme is known
  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    {
      id: "light",
      label: "Light",
      icon: <Sun size={18} />,
    },
    {
      id: "dark",
      label: "Dark",
      icon: <Moon size={18} />,
    },
    {
      id: "system",
      label: "System",
      icon: <Monitor size={18} />,
    },
  ];

  // Render a loading skeleton until the component is mounted on the client
  if (!mounted) {
    return (
      <div
        className="flex items-center gap-1 rounded-full bg-muted p-1"
        aria-hidden="true"
      >
        <div className="h-[34px] w-[34px] rounded-full" />
        <div className="h-[34px] w-[34px] rounded-full" />
        <div className="h-[34px] w-[34px] rounded-full" />
      </div>
    );
  }

  return (
    // The main container that looks like a segmented control
    <div className="flex items-center gap-2 rounded-full bg-muted p-1 w-fit">
      {themeOptions.map((option) => {
        const isActive = theme === option.id;
        return (
          <Tooltip text={option.label} position="bottom" key={option.id}>
            <button
              onClick={() => setTheme(option.id)}
              aria-label={`Switch to ${option.label} theme`}
              className={cn(
                "flex items-center justify-center p-1.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-muted",
                // Style for the active button
                isActive
                  ? "bg-card shadow text-primary"
                  : "text-muted-foreground hover:text-card-foreground"
              )}
            >
              {option.icon}
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
