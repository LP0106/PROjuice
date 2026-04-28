"use client";

import { useEffect, useRef } from "react";

const palette = ["#f59b24", "#d94478", "#95bd3e", "#0f5a3f", "#ffd36f"];

export default function HeroMotion() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse), (max-width: 760px)").matches;
    const pointer = { x: 0.62, y: 0.36, active: false };
    let particles = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resetParticles = () => {
      const count = coarse ? 58 : 132;
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: (coarse ? 1.6 : 2.4) + Math.random() * (coarse ? 3.2 : 5.8),
        speed: 0.18 + Math.random() * 0.88,
        orbit: Math.random() * Math.PI * 2,
        color: palette[index % palette.length],
        alpha: 0.18 + Math.random() * 0.42
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      resetParticles();
    };

    const drawRibbon = (time, offset, color, alpha, thickness) => {
      context.beginPath();
      for (let x = -40; x <= width + 40; x += 18) {
        const wave = Math.sin(x * 0.012 + time + offset) * (coarse ? 16 : 26);
        const y = height * (0.34 + offset * 0.09) + wave + Math.cos(time * 0.7 + x * 0.005) * 18;
        if (x === -40) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = color;
      context.globalAlpha = alpha;
      context.lineWidth = thickness;
      context.lineCap = "round";
      context.stroke();
    };

    const draw = (now = 0) => {
      const time = now * 0.001;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      const glow = context.createRadialGradient(
        width * pointer.x,
        height * pointer.y,
        10,
        width * pointer.x,
        height * pointer.y,
        Math.max(width, height) * 0.62
      );
      glow.addColorStop(0, "rgba(255, 203, 107, 0.32)");
      glow.addColorStop(0.45, "rgba(245, 155, 36, 0.13)");
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "screen";
      drawRibbon(time * 1.25, 0.1, "#f59b24", 0.32, coarse ? 18 : 26);
      drawRibbon(time * 1.08, 1.18, "#d94478", 0.24, coarse ? 13 : 20);
      drawRibbon(time * 0.92, 2.1, "#95bd3e", 0.24, coarse ? 12 : 18);

      particles.forEach((particle, index) => {
        particle.orbit += 0.008 + particle.speed * 0.004;
        particle.x += Math.cos(particle.orbit) * particle.speed + (pointer.active ? (pointer.x * width - particle.x) * 0.0009 : 0);
        particle.y += Math.sin(particle.orbit * 1.18) * particle.speed * 0.8 + 0.12;

        if (particle.x < -24) particle.x = width + 24;
        if (particle.x > width + 24) particle.x = -24;
        if (particle.y > height + 24) particle.y = -24;

        context.beginPath();
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.arc(
          particle.x + Math.sin(time + index) * 12,
          particle.y + Math.cos(time * 0.8 + index) * 8,
          particle.radius,
          0,
          Math.PI * 2
        );
        context.fill();
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      if (!reduced) {
        frame = requestAnimationFrame(draw);
      }
    };

    const movePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    resize();
    draw();

    if (!reduced) {
      frame = requestAnimationFrame(draw);
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", movePointer, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-motion" aria-hidden="true" />;
}
