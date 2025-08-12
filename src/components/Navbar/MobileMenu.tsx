"use client";

import { Button } from "@/components/ui/Button";
import { navItems } from "@/constants/navItems.constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to track which accordion section is open
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the entire menu when the user navigates to a new page
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  // Close the menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset accordion state when main menu is closed
  useEffect(() => {
    if (!isMenuOpen) {
      setOpenAccordion(null);
    }
  }, [isMenuOpen]);

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  return (
    <div className="relative xl:hidden" ref={menuRef}>
      {/* Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X /> : <Menu />}
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 z-50 w-64 origin-top-right rounded-xl bg-card border border-border shadow-lg"
          >
            <nav className="p-2 max-h-[70vh] overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isLinkActive = !item.children && pathname === item.href;
                  const isAccordionActive =
                    item.children?.some((child) => pathname === child.href) ??
                    false;

                  return (
                    <li key={item.label}>
                      {/* If item has children, render an accordion button */}
                      {item.children ? (
                        <>
                          <button
                            onClick={() => toggleAccordion(item.label)}
                            className={cn(
                              "flex items-center justify-between w-full p-3 rounded-md text-card-foreground font-semibold text-left hover:bg-muted",
                              isAccordionActive && "bg-muted"
                            )}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              size={18}
                              className={cn(
                                "transition-transform duration-200",
                                openAccordion === item.label && "rotate-180"
                              )}
                            />
                          </button>
                          {/* Accordion Panel with sub-items */}
                          <AnimatePresence>
                            {openAccordion === item.label && (
                              <motion.ul
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                  marginTop: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                  marginTop: "0.25rem",
                                }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="pl-4 space-y-1 overflow-hidden"
                              >
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={cn(
                                        "block w-full p-2.5 rounded-md text-card-foreground hover:bg-muted text-sm",
                                        pathname === child.href &&
                                          "bg-primary text-primary-foreground hover:bg-primary/90"
                                      )}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        // If it's a simple link
                        <Link
                          href={item.href!}
                          className={cn(
                            "block w-full p-3 rounded-md text-card-foreground font-semibold hover:bg-muted",
                            isLinkActive &&
                              "bg-primary text-primary-foreground hover:bg-primary/90"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              {/* Theme Toggle remains at the bottom */}
              <div className="p-2 mt-2 border-t border-border">
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
