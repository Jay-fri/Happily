"use client";

import { ScrollLink } from "./scroll-link";

export type NavLinkItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
};

export function Navbar({ nav, ctaText, ctaHref }: NavbarProps) {
  return (
    <nav className="hidden items-center gap-5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] md:flex">
      {nav.map((link) => (
        <ScrollLink key={link.href} href={link.href}>
          {link.label}
        </ScrollLink>
      ))}

      {ctaHref && ctaText ? (
        <ScrollLink
          href={ctaHref}
          className="rounded-full bg-(--event-primary-bg) px-4 py-2 font-semibold text-(--event-primary-text) shadow-[3px_3px_0_var(--event-base-text)] transition-transform hover:-translate-y-0.5"
        >
          {ctaText}
        </ScrollLink>
      ) : null}
    </nav>
  );
}
