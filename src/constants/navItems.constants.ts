export interface NavItemChild {
  id: string;
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItemChild[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Pastel Picker", href: "/pastel-picker" },
  { label: "Pastels", href: "/pastels" },
  {
    label: "Catppuccin",
    children: [
      { id: "catppuccin-base", label: "Base Colors", href: "/catppuccin-base" },
      {
        id: "catppuccin-tailwind",
        label: "Tailwind Colors",
        href: "/catppuccin-tailwind",
      },
    ],
  },
  {
    label: "Palettes",
    children: [
      { id: "solid-palette", label: "Solid", href: "/solid-palette" },
      { id: "gradient-palette", label: "Gradient", href: "/gradient-palette" },
    ],
  },
  {
    label: "Palette Generator",
    children: [
      { id: "solid-palette-gen", label: "Solid", href: "/solid-palette-gen" },
      {
        id: "gradient-palette-gen",
        label: "Gradient",
        href: "/gradient-palette-gen",
      },
    ],
  },
];
