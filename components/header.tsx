"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { MobileMenu } from "./mobile-menu";
import type { NavLinkItem } from "./navbar";
import { Navbar } from "./navbar";

type HeaderProps = {
  logo?: string | null;
  logoAlt?: string;
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
  hideNavigation?: boolean;
};

export function Header({
  logo,
  logoAlt = "Logo",
  nav,
  ctaText,
  ctaHref,
  hideNavigation = false,
}: HeaderProps) {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const updateHeaderPosition = () => setIsFloating(window.scrollY > 32);

    updateHeaderPosition();
    window.addEventListener("scroll", updateHeaderPosition, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderPosition);
  }, []);

  if (hideNavigation) {
    return null;
  }

  return (
    <div className="relative z-40 h-16">
      <header
        className={cn(
          "z-40 flex h-16 items-center justify-between gap-4 px-5 transition-[width,transform,top,border-radius,box-shadow] duration-200 sm:px-7",
          isFloating
            ? "fixed top-4 left-1/2 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-[1rem] border border-(--event-base-text)/15 bg-(--event-base-bg)/95 shadow-[0_12px_30px_rgba(21,45,59,0.2)] backdrop-blur md:top-5 md:w-[calc(100%-2.5rem)]"
            : "absolute inset-x-0 top-0 border-b border-(--event-base-text)/15 bg-(--event-base-bg)/90 backdrop-blur",
        )}
      >
        <div className="relative z-60 flex w-full max-w-32 items-center sm:max-w-40">
          {logo && (
            <Link href="/">
              <Image
                src={logo}
                alt={logoAlt}
                width={250}
                height={100}
                className="relative z-60 max-h-10 w-full object-contain object-left"
                draggable={false}
              />
            </Link>
          )}
        </div>

        <Navbar nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        <div className="md:hidden">
          <MobileMenu nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </header>
    </div>
  );
}
