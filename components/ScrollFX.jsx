"use client";

import { useEffect } from "react";

export default function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector(".site-header");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = [...document.querySelectorAll(".fx-reveal")];

    root.classList.add("has-js");

    const syncScroll = () => {
      const max = Math.max(root.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--scroll-progress", `${Math.min((window.scrollY / max) * 100, 100)}%`);
      header?.classList.toggle("is-scrolled", window.scrollY > 18);

      if (!reducedMotion) {
        root.style.setProperty("--scene-shift", `${Math.min(window.scrollY * 0.035, 36)}px`);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", syncScroll);
    syncScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", syncScroll);
    };
  }, []);

  return <div className="scroll-line" aria-hidden="true" />;
}
