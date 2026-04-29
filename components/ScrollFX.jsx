"use client";

import { useEffect } from "react";

export default function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector(".site-header");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = [...document.querySelectorAll(".fx-reveal")];
    const depthNodes = [...document.querySelectorAll("[data-depth]")];
    let ticking = false;

    root.classList.add("has-js");

    const syncScroll = () => {
      const max = Math.max(root.scrollHeight - window.innerHeight, 1);
      const progress = Math.min((window.scrollY / max) * 100, 100);
      root.style.setProperty("--scroll-progress", `${progress}%`);
      root.style.setProperty("--scroll-rotate", `${progress * 2.2}deg`);
      header?.classList.toggle("is-scrolled", window.scrollY > 18);

      if (!reducedMotion) {
        root.style.setProperty("--scene-shift", `${Math.min(window.scrollY * 0.035, 36)}px`);
        depthNodes.forEach((node) => {
          const depth = Number.parseFloat(node.getAttribute("data-depth") || "0.18");
          const rect = node.getBoundingClientRect();
          const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
          const y = Math.max(Math.min(centerOffset * -140 * depth, 70), -70);
          const rotate = Math.max(Math.min(centerOffset * -4.5 * depth, 4.5), -4.5);
          node.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
          node.style.setProperty("--parallax-rotate", `${rotate.toFixed(3)}deg`);
        });
      }
    };

    const requestSync = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          syncScroll();
        });
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
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    syncScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  return (
    <>
      <div className="scroll-line" aria-hidden="true" />
      <div className="scroll-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </>
  );
}
