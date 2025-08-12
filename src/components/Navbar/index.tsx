"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import NavItems from "./NavItems";
import { cn } from "@/lib/utils"; // Make sure to import cn

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Sets the scrolled state to true if user scrolls more than 10px
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        // These classes are always applied
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4",
        "transition-all duration-300 ease-in-out",

        // These classes are applied conditionally
        {
          "bg-background/80 backdrop-blur-sm shadow-md": scrolled,
          "bg-transparent": !scrolled,
        }
      )}
    >
      <Header />
      <NavItems />
    </div>
  );
};

export default Navbar;
