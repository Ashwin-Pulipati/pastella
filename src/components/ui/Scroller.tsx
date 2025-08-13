"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

const Scroller = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // This function handles showing/hiding the button and
  // determining if the user is at the top of the page.
  const toggleVisibility = () => {
    // Show button if scrolled more than 300px
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Check if user is at the very top of the page
    if (window.scrollY < 50) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
    }
  };

  // Scrolls the page to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scrolls the page to the bottom smoothly
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Add a scroll event listener when the component mounts
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        size="icon"
        onClick={isAtTop ? scrollToBottom : scrollToTop}
        className={cn(
          "rounded-full h-12 w-12 transition-opacity duration-300 shadow-lg",
          isVisible || isAtTop ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-label={isAtTop ? "Scroll to Bottom" : "Scroll to Top"}
      >
        {isAtTop ? (
          <ArrowDown className="h-6 w-6" />
        ) : (
          <ArrowUp className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default Scroller;
