"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useRef, useState, type ReactNode } from "react";

// UPDATED: Added isActive property to the item type
type DropdownItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
};

type DropdownProps = {
  id: string;
  label: string;
  icon?: ReactNode;
  items: DropdownItem[];
  className?: string;
  menuClassName?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  icon,
  items,
  className,
  menuClassName,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id={id}
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          "nav-link inline-flex items-center justify-center gap-2 font-bold",
          className
        )}
      >
        {icon}
        {label && <span>{label}</span>}
        {label && (
          <svg
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              open ? "rotate-180" : "rotate-0"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div
        className={cn(
          "absolute right-0 z-50 mt-2 w-56 origin-top-right transition-all duration-200",
          "bg-background rounded-xl border border-border shadow-lg p-1.5",
          open
            ? "scale-100 opacity-100 font-sans font-bold"
            : "scale-95 opacity-0 pointer-events-none",
          menuClassName
        )}
      >
        <ul className="space-y-1">
          {/* UPDATED: Destructures isActive from each item */}
          {items.map(({ id: itemId, label, icon, href, onClick, isActive }) => (
            <li key={itemId || label}>
              {href ? (
                <Link
                  href={href}
                  // UPDATED: Applies active styles conditionally
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm text-left rounded-lg transition-colors text-foreground",
                    "focus:outline-none focus:bg-primary focus:text-primary-foreground",
                    "hover:bg-primary hover:text-primary-foreground",
                    { "bg-primary text-primary-foreground": isActive }
                  )}
                  onClick={() => setOpen(false)}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              ) : (
                <button
                  id={itemId}
                  onClick={() => {
                    if (onClick) onClick();
                    setOpen(false);
                  }}
                  // UPDATED: Applies active styles conditionally
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm text-left rounded-lg transition-colors text-foreground",
                    "focus:outline-none focus:bg-primary focus:text-primary-foreground",
                    "hover:bg-primary hover:text-primary-foreground",
                    { "bg-primary text-primary-foreground": isActive }
                  )}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
