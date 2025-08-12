"use client";

import Dropdown from "@/components/ui/Dropdown";
import { navItems } from "@/constants/navItems.constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu"; // UPDATED: Import the new mobile menu
import ThemeToggle from "./ThemeToggle";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-end text-foreground font-sans">
      {/* Desktop Navigation */}
      <div className="hidden xl:flex items-center gap-2">
        <ul className="inline-flex items-center gap-2 text-base font-semibold tracking-wider">
          {navItems.map((item) => {
            if (item.children) {
              const isDropdownActive = item.children.some(
                (child) => pathname === child.href
              );
              return (
                <Dropdown
                  id={item.label}
                  key={item.label}
                  label={item.label}
                  items={item.children.map((child) => ({
                    ...child,
                    isActive: pathname === child.href,
                  }))}
                  className={cn("nav-link text-sm", {
                    "bg-primary text-primary-foreground": isDropdownActive,
                  })}
                  menuClassName="text-sm"
                />
              );
            }

            if (item.href) {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn("nav-link text-sm", {
                      "bg-primary text-primary-foreground": isActive,
                    })}
                  >
                    <span className="font-sans">{item.label}</span>
                  </Link>
                </li>
              );
            }

            return null;
          })}
        </ul>
        <ThemeToggle />
      </div>

      {/* Mobile Navigation */}
      <MobileMenu />
    </nav>
  );
};

export default NavItems;
