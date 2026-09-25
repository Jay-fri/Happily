import type { PublicEventData } from "@/lib/happily/types";

import { Button } from "@/components/ui/button";

import { ScrollLink } from "./scroll-link";
import { EventDetails } from "./event-details";
import { text } from "./helpers";
import { Container } from "./container";

type HeroSectionProps = {
  event: PublicEventData["event"];
  formActive?: boolean;
};

export function HeroSection({ event, formActive }: HeroSectionProps) {
  const content = event.content;
  const heroSectionType = content.heroSection ?? "image";
  const image = content.heroImage;
  const overlayOpacity =
    content.overlay === "0%" ? "bg-black/45" : "bg-black/65";
  const hasBackground = heroSectionType !== "none";

  return (
    <section
      className="area-z-hero relative isolate overflow-hidden"
      style={
        heroSectionType === "image" && image
          ? { backgroundImage: `url(${image})` }
          : undefined
      }
    >
      {hasBackground && (
        <>
          {heroSectionType === "video" && content.heroVideo && (
            <video
              key={content.heroVideo}
              className="absolute inset-0 -z-20 size-full object-cover"
              loop
              muted
              autoPlay
              playsInline
            >
              <source src={content.heroVideo} type="video/mp4" />
            </video>
          )}
          <div className={`absolute inset-0 -z-10 ${overlayOpacity}`} />
        </>
      )}
      <Container
        id="hero"
        className="grid min-h-[76vh] max-w-7xl content-center justify-items-center py-24 md:min-h-[84vh] md:py-32"
      >
        <div className="area-z-hero-copy max-w-6xl text-center">
          <p className="mb-8 border-l-[3px] border-[#f1bc42] pl-4 font-mono text-sm font-medium uppercase tracking-[0.24em] text-[#f1bc42] mx-auto w-fit">
            {text(content.companyName, event.type ?? "Event")}
          </p>
          <h1 className="area-z-display max-w-[10ch] mx-auto font-display text-[clamp(5.5rem,10vw,11rem)] leading-[0.82] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.42)]">
            {text(event.name, event.name)}
          </h1>
          <div className="text-[#f1bc42]">
            <EventDetails event={event} />
          </div>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-white/95 sm:text-xl md:text-2xl">
            {text(content.heroText)}
          </p>
          {formActive &&
          event.display_settings.buttonLinks?.heroCTA.display &&
          event.display_settings.buttonLinks.heroCTA.text ? (
            <Button
              asChild
              size="lg"
              className="mt-5 min-h-12 rounded-full bg-(--event-accent-bg) px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-(--event-accent-text) shadow-[4px_4px_0_var(--event-base-text)] hover:bg-(--event-accent-bg)/85"
            >
              <ScrollLink href="#register">
                {text(
                  event.display_settings.buttonLinks.heroCTA.text,
                  "Register",
                )}
              </ScrollLink>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
