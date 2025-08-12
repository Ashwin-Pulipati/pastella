// src/components/Footer.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { NavItemChild, navItems } from "@/constants/navItems.constants";
import { CheckCircle, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  // This logic for creating a flat list of all navigation links is fine.
  const allLinks = navItems.reduce((acc: NavItemChild[], item) => {
    if (item.href) {
      acc.push({ id: item.label, label: item.label, href: item.href });
    } else if (item.children) {
      const childLinks = item.children.map((child) => {
        const newLabel =
          item.label === "Catpuccin"
            ? `${item.label} ${child.label}`
            : `${child.label} ${item.label}`;
        return {
          ...child,
          label: newLabel,
        };
      });
      acc.push(...childLinks);
    }
    return acc;
  }, []);

  return (
    // Responsive padding for the entire footer
    <footer className="relative w-full overflow-hidden bg-background/50 px-6 py-12 sm:px-8 sm:py-10">
      {/* Decorative blurs are now hidden on mobile to reduce clutter and improve performance */}
      <div className="hidden md:block absolute -bottom-1/2 -left-1/4 -z-10 h-[40rem] w-[50rem] rounded-full bg-accent/10 blur-3xl dark:bg-accent/20" />
      <div className="hidden md:block absolute -right-1/4 -top-1/2 -z-10 h-[40rem] w-[50rem] rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
      <div className="hidden md:block absolute right-1/4 top-1/3 -z-10 h-[30rem] w-[50rem] rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/20" />

      <div className="mx-auto max-w-7xl">
        {/* Grid with responsive gaps */}
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-x-12 md:text-left">
          {/* Column 1: Pastella Info */}
          <div>
            <h2 className="gradient-text-clip bg-gradient animate-gradient text-2xl font-special tracking-widest">
              Pastella
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Crafting the color of your dreams.
            </p>
            <div className="mt-4 flex justify-center gap-2 md:justify-start">
              {[
                { Icon: Github, href: "https://github.com/your-profile" },
                {
                  Icon: Linkedin,
                  href: "https://linkedin.com/in/your-profile",
                },
              ].map((Social, i) => (
                <Link
                  key={i}
                  href={Social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Link to social media ${i + 1}`}
                >
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Social.Icon size={20} />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div>
            <h3 className="font-sans text-lg font-bold text-foreground">
              Explore
            </h3>
            <div className="mt-2 space-y-1.5">
              {allLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="font-sans text-lg font-bold text-foreground">
              Join the Cosmos
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get the latest updates and inspirations delivered to your inbox.
            </p>
            <form className="mt-4 flex items-center gap-2">
              <input
                type="email"
                placeholder="your-email@domain.com"
                className="w-full rounded-md border border-border bg-muted px-4 py-2 text-sm text-foreground transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
              <Button
                type="submit"
                variant="secondary"
                size="icon"
                aria-label="Submit email for newsletter"
                className="shrink-0"
              >
                <CheckCircle size={20} />
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright section with a border-t instead of <hr> for cleaner code */}
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Pastella. All rights reserved.
            Built in the cosmos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
