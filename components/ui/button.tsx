import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    // ── Structure ──
    "group/button relative isolate inline-flex shrink-0 items-center justify-center",
    "overflow-hidden select-none whitespace-nowrap",
    "font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em]",

    // ── Technical border ──
    "border-2 border-current/25",

    // ── Smooth transitions ──
    "transition-[transform,box-shadow,filter,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",

    // ── Hover: lift + scale + intensify ──
    "hover:-translate-y-[3px] hover:scale-[1.04]",

    // ── Active / Pressed: compress + inset shadow ──
    "active:translate-y-[1px] active:scale-[0.97] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)]",
    "active:duration-100",

    // ── Focus-visible: geometric outline glow ──
    "outline-none focus-visible:ring-[3px] focus-visible:ring-offset-2",
    "focus-visible:ring-[var(--event-accent-bg,#e5533d)]",

    // ── Disabled: muted, no motion ──
    "disabled:pointer-events-none disabled:translate-y-0 disabled:scale-100",
    "disabled:opacity-40 disabled:saturate-[0.3] disabled:shadow-none disabled:border-current/10",

    // ── Sweep shimmer pseudo-element (CSS-only diagonal highlight) ──
    "before:pointer-events-none before:absolute before:inset-0 before:-z-0",
    "before:translate-x-[-110%] before:skew-x-[-18deg]",
    "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
    "before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:before:translate-x-[110%]",

    // ── ARIA / validation / SVG ──
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /* ── Primary: bold filled aerospace button ── */
        default: [
          "bg-[var(--event-primary-bg,#173f52)] text-[var(--event-primary-text,#f7f0dc)]",
          "border-[var(--event-primary-bg,#173f52)]",
          "shadow-[3px_3px_0_var(--event-base-text,#173f52)]",
          "hover:bg-[color-mix(in_oklch,var(--event-primary-bg,#173f52)_85%,white)]",
          "hover:shadow-[4px_5px_0_var(--event-base-text,#173f52)]",
          "active:shadow-[1px_1px_0_var(--event-base-text,#173f52)]",
        ].join(" "),

        /* ── Outline: technical wireframe button ── */
        outline: [
          "bg-transparent text-[var(--event-base-text,#173f52)]",
          "border-[var(--event-base-text,#173f52)]",
          "shadow-[2px_2px_0_var(--event-base-text,#173f52)]",
          "hover:bg-[var(--event-base-text,#173f52)]/8",
          "hover:shadow-[3px_4px_0_var(--event-base-text,#173f52)]",
          "active:shadow-[0px_0px_0_var(--event-base-text,#173f52)]",
          "active:bg-[var(--event-base-text,#173f52)]/12",
        ].join(" "),

        /* ── Secondary: warm muted tone ── */
        secondary: [
          "bg-[var(--event-secondary-bg,#d6e5db)] text-[var(--event-secondary-text,#173f52)]",
          "border-[var(--event-secondary-text,#173f52)]/40",
          "shadow-[3px_3px_0_var(--event-secondary-text,#173f52)]/20",
          "hover:bg-[color-mix(in_oklch,var(--event-secondary-bg,#d6e5db)_85%,white)]",
          "hover:border-[var(--event-secondary-text,#173f52)]/60",
          "hover:shadow-[4px_5px_0_var(--event-secondary-text,#173f52)]/25",
          "active:shadow-[1px_1px_0_var(--event-secondary-text,#173f52)]/20",
        ].join(" "),

        /* ── Ghost: invisible until interaction ── */
        ghost: [
          "border-transparent bg-transparent shadow-none",
          "text-[var(--event-base-text,#173f52)]",
          "hover:bg-[var(--event-base-text,#173f52)]/8",
          "hover:border-[var(--event-base-text,#173f52)]/15",
          "active:bg-[var(--event-base-text,#173f52)]/15",
          "before:hidden",
        ].join(" "),

        /* ── Destructive: warning/delete ── */
        destructive: [
          "bg-destructive/10 text-destructive",
          "border-destructive/30",
          "shadow-[2px_2px_0_theme(colors.destructive/20)]",
          "hover:bg-destructive/20 hover:border-destructive/50",
          "hover:shadow-[3px_4px_0_theme(colors.destructive/25)]",
          "active:shadow-[0px_0px_0_theme(colors.destructive/20)]",
          "focus-visible:ring-destructive/40",
        ].join(" "),

        /* ── Link: text-only underline ── */
        link: [
          "border-transparent bg-transparent shadow-none p-0 h-auto",
          "text-[var(--event-accent-bg,#e5533d)] underline-offset-4",
          "hover:underline hover:translate-y-0 hover:scale-100",
          "active:translate-y-0 active:scale-100",
          "before:hidden",
        ].join(" "),
      },
      size: {
        default:
          "h-9 gap-1.5 rounded-[0.35rem] px-3.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[0.25rem] px-2 text-[0.6rem] tracking-[0.12em] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[0.3rem] px-3",
        lg: "h-11 gap-2 rounded-[0.4rem] px-5 text-[0.76rem]",
        icon: "size-9 rounded-[0.35rem]",
        "icon-xs": "size-6 rounded-[0.25rem] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-[0.3rem]",
        "icon-lg": "size-10 rounded-[0.4rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

