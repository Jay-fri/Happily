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
      {/* 
        The header is always fixed + centered. The "flush" vs "floating" look
        is driven entirely by animatable properties (width, top, border-radius,
        scale, shadow, padding) so we never snap between position modes.
      */}
      <header
        className={cn(
          // ── base (always applied) ──
          "fixed left-1/2 z-40 flex h-16 -translate-x-1/2 items-center justify-between gap-4 border bg-(--event-base-bg)/95 backdrop-blur",
          // ── smooth transition on every visual property ──
          "transition-[width,max-width,top,border-radius,border-color,box-shadow,transform,padding,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // ── state fork ──
          isFloating
            ? [
                // Floating: narrower, rounded, lifted, scaled down slightly, shadow
                "top-4 w-[calc(100%-1.5rem)] max-w-6xl rounded-[1rem] px-5 sm:px-7",
                "border-(--event-base-text)/15",
                "shadow-[0_12px_30px_rgba(21,45,59,0.2)]",
                "scale-100",
                "md:top-5 md:w-[calc(100%-2.5rem)]",
              ]
            : [
                // Flush: full-width, square corners, no shadow, slightly larger scale
                "top-0 w-full max-w-none rounded-none px-5 sm:px-7",
                "border-transparent border-b-[color:var(--event-base-text)]/15",
                "shadow-none",
                "scale-[1.005]",
              ],
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
