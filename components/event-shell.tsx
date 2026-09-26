import type { ReactNode } from "react";

import type { PublicEventData } from "@/lib/happily/types";

import { Footer } from "./footer";
import { Header } from "./header";
import { PreviewBanner } from "./preview-banner";
import { styleValue, text } from "./helpers";
import type { NavLinkItem } from "./navbar";

type EventShellProps = {
  eventData: PublicEventData;
  children: ReactNode;
  preview?: boolean;
};

export function EventShell({ eventData, children, preview }: EventShellProps) {
  const { event } = eventData;
  const styles = event.styles;

  const nav: NavLinkItem[] = [
    { label: "About", href: "/#about" },
    { label: "Agenda", href: "/#agenda" },
    { label: "Speakers", href: "/#speakers" },
    { label: "Host", href: "/#host" },
    { label: "Sponsors", href: "/#sponsors" },
    { label: "FAQ", href: "/#faq" },
    ...(event.photos_toggle ? [{ label: "Gallery", href: "/photos" }] : []),
  ];

  const buttonLinks = event.display_settings.buttonLinks;
  const showCta =
    eventData.form?.is_active &&
    buttonLinks?.navCTA.display &&
    buttonLinks.heroCTA.text;

  return (
    <div className="area-z-site flex min-h-screen flex-col bg-(--event-base-bg) text-(--event-base-text)">
      {preview && <PreviewBanner />}
      {/* DEMO BANNER CODE BELOW */}
      {/* <div className="flex items-center justify-center gap-2 bg-[#e5533d] px-4 py-2 text-center font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#fff8e9]">
        <span>🎟</span>
        <span>Early bird tickets available — limited spots left.</span>
        <a href="/#register" className="underline underline-offset-2 hover:opacity-80">Register now</a>
      </div> */}
      <Header
        logo={event.logo_url}
        logoAlt={`${event.name} logo`}
        nav={nav}
        hideNavigation={event.display_settings.hideNavigation ?? false}
        ctaText={
          showCta ? text(buttonLinks!.heroCTA.text, "Register") : undefined
        }
        ctaHref={showCta ? "/#register" : undefined}
      />
      {children}
      <Footer baseBackgroundColor={styleValue(styles, "baseBg", "#ffffff")} />
    </div>
  );
}
