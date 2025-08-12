// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/lib/utils";
// import * as React from "react";

// // --- 1. DEFINE ALL BUTTON STYLES WITH CVA (No changes here) ---
// // This is the "brain" of the button. It defines all possible looks and sizes.
// const buttonVariants = cva(
//   // Base classes applied to ALL variants
//   [
//     "inline-flex items-center justify-center whitespace-nowrap", // Prevent text wrapping
//     "rounded-md text-sm font-semibold", // Bolder font for clarity
//     "transition-all duration-200", // Smoother transition for all properties
//     "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2", // Use focus-visible for accessibility
//     "disabled:opacity-50 disabled:pointer-events-none",
//     "ring-offset-surface text-base", // Ensure ring offset works in light/dark mode
//   ],
//   {
//     variants: {
//       // --- DIFFERENT STYLES ---
//       variant: {
//         // Primary CTA: Uses the main brand gradient
//         gradient:
//           "bg-gradient text-on-accent shadow-subtle hover:opacity-90 active:opacity-80 transform hover:scale-[1.02] focus-visible:ring-accent-primary",
//         // Branded Purple
//         primary:
//           "bg-interactive-branded-primary text-on-interactive-branded-primary hover:bg-interactive-branded-hover-primary shadow-subtle",
//         secondary:
//           "bg-interactive-branded-secondary text-on-interactive-branded-secondary hover:bg-interactive-branded-hover-secondary shadow-subtle",
//         // Branded Amber
//         tertiary:
//           "bg-interactive-branded-tertiary text-on-interactive-branded-tertiary hover:bg-interactive-branded-hover-tertiary shadow-subtle",
//         // NEW: Outline variant
//         outline:
//           "border border-border-interactive bg-transparent text-on-interactive-branded-primary hover:bg-interactive-branded-primary shadow-subtle",
//         // For less important actions
//         ghost:
//           "bg-transparent hover:bg-interactive hover:text-on-interactive focus-visible:ring-border-interactive",
//         // For dangerous actions (e.g., delete)
//         destructive:
//           "bg-red-100 text-slate-500 hover:bg-red-100 dark:bg-red-500 dark:text-slate-100 dark:hover:bg-red-500 shadow-subtle",
//         success:
//           "bg-green-100 text-green-500 hover:bg-green-100 dark:bg-green-500 dark:text-green-100 dark:hover:bg-green-500 shadow-subtle",
//       },
//       // --- DIFFERENT SIZES ---
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-md px-3",
//         lg: "h-11 rounded-md px-8",
//         icon: "h-10 w-10",
//       },
//     },
//     // Default styles if none are specified
//     defaultVariants: {
//       variant: "gradient",
//       size: "default",
//     },
//   }
// );

// // --- 2. DEFINE THE COMPONENT'S PROPS (Removed Radix dependency) ---
// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {}

// // --- 3. CREATE THE REACT COMPONENT (Simplified to always be a button) ---
// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, ...props }, ref) => {
//     return (
//       <button
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button, buttonVariants };


import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

// --- 1. DEFINE ALL BUTTON STYLES WITH CVA ---
const buttonVariants = cva(
  // Base classes applied to ALL variants
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-md text-sm font-semibold", // Using a standard text size and weight
    "transition-all duration-200", // Smoother transitions
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Accessible focus state
    "disabled:opacity-50 disabled:pointer-events-none",
    "ring-offset-background", // Use background for ring offset
  ],
  {
    variants: {
      // --- DIFFERENT STYLES ---
      variant: {
        // Primary CTA: Uses the main brand gradient
        gradient:
          "bg-gradient text-accent-foreground shadow hover:opacity-90 active:scale-[0.98]",
        // Standard solid button
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
        // Secondary action button
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow",
        // Accent color button
        tertiary: "bg-accent text-accent-foreground hover:bg-accent/90 shadow",
        // Outline variant
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        // For less important actions
        ghost: "hover:bg-muted hover:text-muted-foreground",
        // For dangerous actions (e.g., delete)
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow",
        // For success actions
        success:
          "bg-success text-success-foreground hover:bg-success/90 shadow",
      },
      // --- DIFFERENT SIZES ---
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    // Default styles if none are specified
    defaultVariants: {
      variant: "gradient",
      size: "default",
    },
  }
);

// --- 2. DEFINE THE COMPONENT'S PROPS ---
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// --- 3. CREATE THE REACT COMPONENT ---
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
