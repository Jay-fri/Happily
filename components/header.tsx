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
    const onScroll = () => setIsFloating(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hideNavigation) {
    return null;
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-40 flex justify-center pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isFloating ? "pt-3" : "pt-0",
      )}>
      <header
        className={cn(
          "pointer-events-auto flex h-14 items-center justify-between gap-4 px-5 sm:px-7",
          "transition-[width,border-radius,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isFloating
            ? "w-[calc(100%-2rem)] max-w-4xl rounded-lg border border-(--event-base-text)/15 bg-(--event-base-bg)/95 shadow-[0_4px_24px_rgba(23,63,82,0.12)] backdrop-blur"
            : "w-full rounded-none border-b border-(--event-base-text)/15 bg-(--event-base-bg)/95 backdrop-blur",
        )}>
        <div className="flex w-full max-w-32 items-center sm:max-w-40">
          {logo && (
            <Link href="/">
              <Image
                src={logo}
                alt={logoAlt}
                width={250}
                height={100}
                className="max-h-10 w-full object-contain object-left"
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
