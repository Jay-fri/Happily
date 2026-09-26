"use client";

import { useEffect } from "react";

export function BannerObserver() {
  useEffect(() => {
    const el = document.getElementById("top-banners");
    if (!el) return;

    const update = () =>
      document.body.style.setProperty("--banner-h", `${el.offsetHeight}px`);

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return null;
}
