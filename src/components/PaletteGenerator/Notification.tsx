"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NotificationProps {
  message: string;
  isVisible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible }) => (
  <div
    className={cn(
      "fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out flex flex-col items-center",
      isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-10 opacity-0 pointer-events-none"
    )}
  >
    <Image src="/cherio.png" alt="Cherio" width={200} height={200} />
    <div
      className={cn(
        "flex items-center gap-3 rounded-full py-3 px-5 font-bold shadow-lg",
        // UPDATED: Uses the .bg-gradient utility and the correct text color for on-accent styles
        "bg-gradient text-accent-foreground"
      )}
    >
      <Check className="h-5 w-5" />
      <span>{message}</span>
    </div>
  </div>
);

export default Notification;
