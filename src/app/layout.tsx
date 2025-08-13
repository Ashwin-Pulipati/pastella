import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { ThemeProvider as NextJSThemeProvider } from "next-themes";
import { Quicksand, Roboto } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import "./globals.css";
import Scroller from "@/components/ui/Scroller";

const quickSand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const gangOfThree = localFont({
  src: [
    {
      path: "../../public/fonts/gang-of-three.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gangOfThree",
});

export const metadata: Metadata = {
  title: {
    default: "Pastella",
    template: `%s - Pastella`,
  },
  description:
    "A color palette generator for designers and developers. Create, save, and share beautiful color palettes.",
  keywords: [
    "color",
    "palette",
    "generator",
    "design",
    "development",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [
    { name: "Ashwin Pulipati", url: "https://github.com/Ashwin-Pulipati" },
  ],
  creator: "Ashwin Pulipati",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pastella.vercel.app/",
    title: "Pastella",
    description:
      "A color palette generator for designers and developers. Create, save, and share beautiful color palettes.",
    siteName: "Pastella",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
      <body
        className={`${quickSand.variable} ${roboto.variable} ${gangOfThree.variable} antialiased`}
      >
        <NextJSThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          {children}
          <Footer />
          <Scroller />
        </NextJSThemeProvider>
      </body>
    </html>
  );
}
