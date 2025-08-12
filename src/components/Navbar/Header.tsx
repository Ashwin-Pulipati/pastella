import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <Link href="/" className="cursor-pointer">
      {/* The gap is now smaller on mobile and larger on desktop */}
      <header className="flex items-center justify-start gap-3 md:gap-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={48}
          height={48}
          // The logo is now smaller on mobile and larger on desktop
          className="h-10 w-auto md:h-12"
        />
        <h1
          className={
            cn("w-fit h-fit gradient-text-clip bg-gradient animate-gradient ",
            "text-2xl sm:text-3xl md:text-4xl" ,
            "font-special leading-none tracking-widest")
          }
        >
          Pastella
        </h1>
      </header>
    </Link>
  );
};

export default Header;
