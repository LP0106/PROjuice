const immersiveShell = document.querySelector(".immersive-shell");

if (immersiveShell) {
  const root = document.documentElement;
  const body = document.body;
  const select = (selector) => immersiveShell.querySelector(selector);
  const selectAll = (selector) => [...immersiveShell.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mode = immersiveShell.dataset.immersiveMode || "standalone";
  const handoffTarget = immersiveShell.dataset.handoffTarget
    ? document.querySelector(immersiveShell.dataset.handoffTarget)
    : document.querySelector("#main-interface");

  const backdrop = select(".experience-backdrop");
  const experienceHeader = select(".experience-header");
  const stage = select(".experience-stage");
  const bottle = select("#bottle-assembly");
  const cap = select("#scene-cap");
  const liquid = select("#bottle-liquid");
  const meterFill = select("#scene-meter-fill");
  const progressLabel = select("#scene-progress-label");
  const stateLabel = select("#scene-state-label");
  const haloA = select(".stage-halo-a");
  const haloB = select(".stage-halo-b");
  const haloC = select(".stage-halo-c");
  const rings = selectAll(".rewind-ring");
  const chapterCards = selectAll(".chapter-card");

  body.classList.add("immersive-enhanced");

  if (mode === "integrated" && handoffTarget) {
    body.classList.add("has-immersive-intro");
  }

  const ribbons = [
    { node: select(".ribbon-a"), toX: -420, toY: -280, rotate: -30, delay: 0.12, drift: 0 },
    { node: select(".ribbon-b"), toX: -280, toY: -210, rotate: -16, delay: 0.18, drift: 0 },
    { node: select(".ribbon-c"), toX: 250, toY: -250, rotate: 18, delay: 0.24, drift: 0 },
    { node: select(".ribbon-d"), toX: 420, toY: -170, rotate: 34, delay: 0.28, drift: 0 },
    { node: select(".ribbon-e"), toX: -170, toY: 20, rotate: 8, delay: 0.32, drift: 0 },
    { node: select(".ribbon-f"), toX: 160, toY: 42, rotate: -6, delay: 0.36, drift: 0 },
  ];

  const fruits = [
    { node: select(".fruit-a"), toX: -430, toY: -230, rotate: 260, delay: 0.14, drift: 34 },
    { node: select(".fruit-b"), toX: -270, toY: -340, rotate: 210, delay: 0.18, drift: 28 },
    { node: select(".fruit-c"), toX: -160, toY: -120, rotate: 320, delay: 0.24, drift: 20 },
    { node: select(".fruit-d"), toX: 240, toY: -320, rotate: 220, delay: 0.18, drift: 30 },
    { node: select(".fruit-e"), toX: 360, toY: -180, rotate: 300, delay: 0.24, drift: 24 },
    { node: select(".fruit-f"), toX: 490, toY: -90, rotate: 260, delay: 0.32, drift: 22 },
    { node: select(".fruit-g"), toX: -110, toY: 40, rotate: 180, delay: 0.28, drift: 18 },
    { node: select(".fruit-h"), toX: 120, toY: 60, rotate: 240, delay: 0.34, drift: 16 },
    { node: select(".fruit-i"), toX: 310, toY: 16, rotate: 200, delay: 0.38, drift: 20 },
  ];

  const proteins = [
    { node: select(".protein-a"), toX: -360, toY: -170, delay: 0.20, drift: 20 },
    { node: select(".protein-b"), toX: -330, toY: -290, delay: 0.22, drift: 18 },
    { node: select(".protein-c"), toX: -220, toY: -240, delay: 0.26, drift: 24 },
    { node: select(".protein-d"), toX: -90, toY: -290, delay: 0.30, drift: 16 },
    { node: select(".protein-e"), toX: 44, toY: -260, delay: 0.34, drift: 14 },
    { node: select(".protein-f"), toX: 184, toY: -230, delay: 0.30, drift: 20 },
    { node: select(".protein-g"), toX: 300, toY: -180, delay: 0.28, drift: 22 },
    { node: select(".protein-h"), toX: 380, toY: -110, delay: 0.32, drift: 20 },
    { node: select(".protein-i"), toX: 438, toY: -40, delay: 0.36, drift: 18 },
    { node: select(".protein-j"), toX: -230, toY: 10, delay: 0.38, drift: 15 },
    { node: select(".protein-k"), toX: 80, toY: 34, delay: 0.42, drift: 16 },
    { node: select(".protein-l"), toX: 250, toY: 50, delay: 0.46, drift: 14 },
  ];

  const shards = [
    { node: select(".shard-a"), toX: -300, toY: -200, rotate: -34, delay: 0.23 },
    { node: select(".shard-b"), toX: -160, toY: -300, rotate: -12, delay: 0.27 },
    { node: select(".shard-c"), toX: 120, toY: -300, rotate: 16, delay: 0.31 },
    { node: select(".shard-d"), toX: 260, toY: -180, rotate: 32, delay: 0.35 },
    { node: select(".shard-e"), toX: -70, toY: -120, rotate: -18, delay: 0.39 },
    { node: select(".shard-f"), toX: 180, toY: 0, rotate: 12, delay: 0.44 },
  ];

  const bubbles = [
    { node: select(".bubble-a"), toX: -250, toY: -140, delay: 0.18, drift: 24 },
    { node: select(".bubble-b"), toX: -120, toY: -220, delay: 0.24, drift: 20 },
    { node: select(".bubble-c"), toX: 40, toY: -200, delay: 0.28, drift: 18 },
    { node: select(".bubble-d"), toX: 170, toY: -120, delay: 0.33, drift: 16 },
    { node: select(".bubble-e"), toX: 290, toY: -70, delay: 0.38, drift: 14 },
    { node: select(".bubble-f"), toX: 120, toY: 20, delay: 0.44, drift: 12 },
  ];

  const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
  const mix = (start, end, amount) => start + (end - start) * amount;

  const mapRange = (value, start, end) => {
    if (end === start) {
      return 0;
    }

    return clamp((value - start) / (end - start));
  };

  const ease = (value) => {
    return value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;
  };

  const animateBurstNode = (config, progress, options = {}) => {
    if (!config.node) {
      return;
    }

    const local = ease(mapRange(progress, config.delay, Math.min(config.delay + 0.42, 1)));
    const wave = Math.sin((progress * Math.PI * 3) + (config.delay * 10)) * (config.drift || 0) * local;
    const rotate = mix(0, config.rotate || 0, local);
    const scale = mix(options.fromScale || 0.18, options.toScale || 1, local);
    const opacity = local > 0.02 ? Math.min(local * 1.2, 1) : 0;

    config.node.style.opacity = String(opacity);
    config.node.style.transform = `translate3d(${mix(0, config.toX, local)}px, ${mix(0, config.toY, local) + wave}px, 0) rotate(${rotate}deg) scale(${scale})`;
  };

  chapterCards.forEach((card) => {
    const start = Number(card.dataset.start || "0");
    const end = Number(card.dataset.end || "1");
    card.dataset.rangeStart = String(start);
    card.dataset.rangeEnd = String(end);
  });

  const state = {
    frameRequested: false,
    autoHandoffLocked: false,
    lastScrollY: window.scrollY,
    lastProgress: -1,
    lastOverlay: -1,
  };

  const getMetrics = () => {
    const shellTop = immersiveShell.offsetTop;
    const shellHeight = immersiveShell.offsetHeight;
    const scrollDistance = Math.max(shellHeight - window.innerHeight, 1);
    const sceneProgress = clamp((window.scrollY - shellTop) / scrollDistance);

    if (mode !== "integrated" || !handoffTarget) {
      return {
        sceneProgress,
        overlayProgress: 0,
        triggerY: shellTop + scrollDistance,
        targetTop: 0,
      };
    }

    const targetTop = handoffTarget.offsetTop;
    const revealStart = Math.max(targetTop - (window.innerHeight * 0.82), shellTop + (scrollDistance * 0.72));
    const revealEnd = targetTop - (window.innerHeight * 0.08);
    const overlayProgress = clamp((window.scrollY - revealStart) / Math.max(revealEnd - revealStart, 1));
    const triggerY = shellTop + scrollDistance - Math.min(window.innerHeight * 0.06, 32);

    return {
      sceneProgress,
      overlayProgress,
      triggerY,
      targetTop,
    };
  };

  const applyOverlayState = (overlayProgress) => {
    const opacity = (1 - overlayProgress).toFixed(4);

    if (backdrop) {
      backdrop.style.opacity = opacity;
    }

    if (experienceHeader) {
      experienceHeader.style.opacity = opacity;
    }

    if (stage) {
      stage.style.opacity = opacity;
      stage.style.transform = `scale(${mix(1, 1.035, overlayProgress)})`;
    }

    immersiveShell.classList.toggle("is-overlay-hidden", overlayProgress > 0.995);
  };

  const updateSceneLabels = (progress, overlayProgress) => {
    if (!progressLabel || !stateLabel || !meterFill) {
      return;
    }

    const percent = Math.round(progress * 100);
    progressLabel.textContent = `${percent}%`;
    meterFill.style.width = `${percent}%`;

    if (progress < 0.12) {
      stateLabel.textContent = "Bottle sealed";
    } else if (progress < 0.34) {
      stateLabel.textContent = "Pressure rising";
    } else if (progress < 0.64) {
      stateLabel.textContent = "Pour in motion";
    } else if (overlayProgress > 0.72) {
      stateLabel.textContent = "Main interface entering";
    } else if (progress < 0.88) {
      stateLabel.textContent = "Splash fully spread";
    } else {
      stateLabel.textContent = mode === "integrated" ? "Launch frame locked" : "Rewind ready";
    }
  };

  const updateBottle = (progress) => {
    if (!bottle || !cap || !liquid) {
      return;
    }

    const tip = ease(mapRange(progress, 0.08, 0.34));
    const release = ease(mapRange(progress, 0.18, 0.72));
    const settle = ease(mapRange(progress, 0.72, 1));

    bottle.style.setProperty("--bottle-y", `${mix(-50, -56, tip)}%`);
    bottle.style.setProperty("--bottle-rotate", `${mix(0, -28, tip) + mix(0, 8, settle) * 0.25}deg`);
    bottle.style.setProperty("--bottle-scale", `${mix(1, 1.045, release)}`);

    cap.style.setProperty("--cap-x", `${mix(0, -72, tip)}px`);
    cap.style.setProperty("--cap-y", `${mix(0, -108, tip)}px`);
    cap.style.setProperty("--cap-rotate", `${mix(0, -120, tip)}deg`);

    liquid.style.setProperty("--liquid-fill", `${mix(1, 0.22, release)}`);
    liquid.style.setProperty("--liquid-opacity", `${mix(1, 0.68, release)}`);
  };

  const updateBackground = (progress) => {
    if (stage) {
      stage.style.filter = `saturate(${mix(0.96, 1.14, progress)}) brightness(${mix(0.96, 1.04, progress)})`;
    }

    if (haloA) {
      haloA.style.transform = `translate(-50%, -50%) scale(${mix(0.82, 1.18, progress)})`;
      haloA.style.opacity = String(mix(0.64, 1, progress));
    }

    if (haloB) {
      haloB.style.transform = `translate(-50%, -50%) scale(${mix(0.9, 1.3, progress)})`;
      haloB.style.opacity = String(mix(0.45, 0.9, progress));
    }

    if (haloC) {
      haloC.style.transform = `translate(-50%, -50%) scale(${mix(0.76, 1.24, progress)})`;
      haloC.style.opacity = String(mix(0.3, 0.72, progress));
    }

    rings.forEach((ring, index) => {
      const base = 1 + progress * (0.16 + index * 0.1);
      ring.style.transform = `translate(-50%, -50%) scale(${base})`;
      ring.style.opacity = String(mix(0.24, 0.56, progress) - index * 0.08);
    });
  };

  const updateChapters = (progress) => {
    chapterCards.forEach((card) => {
      const start = Number(card.dataset.rangeStart || "0");
      const end = Number(card.dataset.rangeEnd || "1");
      const midpoint = (start + end) / 2;
      const halfRange = (end - start) / 2;
      const distance = Math.abs(progress - midpoint) / Math.max(halfRange, 0.001);
      const visibility = clamp(1 - distance);
      const eased = ease(visibility);
      const horizontalOffset = card.closest(".chapter-right")
        ? mix(48, 0, eased)
        : mix(-48, 0, eased);

      card.style.opacity = String(mix(0.14, 1, eased));
      card.style.transform = `translate3d(${horizontalOffset}px, ${mix(28, 0, eased)}px, 0) scale(${mix(0.955, 1, eased)})`;
      card.classList.toggle("is-active", visibility > 0.3);
    });
  };

  const renderScene = (progress, overlayProgress) => {
    updateSceneLabels(progress, overlayProgress);
    updateBottle(progress);
    updateBackground(progress);
    updateChapters(progress);
    applyOverlayState(overlayProgress);

    ribbons.forEach((config, index) => {
      animateBurstNode(config, progress, {
        fromScale: 0.08,
        toScale: 1 + (index * 0.08),
      });
    });

    fruits.forEach((config) => {
      animateBurstNode(config, progress, {
        fromScale: 0.12,
        toScale: 1,
      });
    });

    proteins.forEach((config) => {
      animateBurstNode(config, progress, {
        fromScale: 0.3,
        toScale: 1,
      });
    });

    shards.forEach((config) => {
      animateBurstNode(config, progress, {
        fromScale: 0.24,
        toScale: 1,
      });
    });

    bubbles.forEach((config) => {
      animateBurstNode(config, progress, {
        fromScale: 0.28,
        toScale: 1,
      });
    });

    immersiveShell.style.setProperty("--scene-progress", progress.toFixed(4));
    root.style.setProperty("--scene-progress", progress.toFixed(4));
  };

  const maybeAutoHandoff = (metrics) => {
    if (mode !== "integrated" || !handoffTarget) {
      return;
    }

    const isScrollingDown = window.scrollY > state.lastScrollY + 1;
    const resetThreshold = metrics.triggerY - (window.innerHeight * 0.35);

    if (window.scrollY < resetThreshold) {
      state.autoHandoffLocked = false;
    }

    if (!state.autoHandoffLocked && isScrollingDown && metrics.sceneProgress >= 0.992) {
      state.autoHandoffLocked = true;
      window.scrollTo({
        top: metrics.targetTop,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  const renderFrame = () => {
    state.frameRequested = false;

    const metrics = getMetrics();

    if (
      Math.abs(metrics.sceneProgress - state.lastProgress) > 0.0004 ||
      Math.abs(metrics.overlayProgress - state.lastOverlay) > 0.001
    ) {
      renderScene(metrics.sceneProgress, metrics.overlayProgress);
      state.lastProgress = metrics.sceneProgress;
      state.lastOverlay = metrics.overlayProgress;
    }

    maybeAutoHandoff(metrics);
    state.lastScrollY = window.scrollY;
  };

  const requestRender = () => {
    if (state.frameRequested) {
      return;
    }

    state.frameRequested = true;
    window.requestAnimationFrame(renderFrame);
  };

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  window.addEventListener("load", requestRender);
  requestRender();
}
