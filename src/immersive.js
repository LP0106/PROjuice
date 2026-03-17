const immersiveShell = document.querySelector(".immersive-shell");

if (immersiveShell) {
  const root = document.documentElement;
  const body = document.body;
  const select = (selector) => immersiveShell.querySelector(selector);
  const selectAll = (selector) => [...immersiveShell.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const performanceLiteQuery = window.matchMedia("(max-width: 1180px)");
  let performanceLite = performanceLiteQuery.matches;
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
  const chapterMeta = chapterCards.map((card) => ({
    card,
    start: Number(card.dataset.start || "0"),
    end: Number(card.dataset.end || "1"),
    isRightAligned: Boolean(card.closest(".chapter-right")),
  }));

  body.classList.add("immersive-enhanced");

  if (handoffTarget) {
    body.classList.add("has-immersive-intro");
  }

  const mists = [
    { node: select(".mist-a"), fromX: -78, fromY: -166, toX: -300, toY: -70, rotate: -8, delay: 0.16, drift: 20 },
    { node: select(".mist-b"), fromX: -60, fromY: -154, toX: 10, toY: -18, rotate: 0, delay: 0.24, drift: 18 },
    { node: select(".mist-c"), fromX: -44, fromY: -148, toX: 290, toY: -40, rotate: 8, delay: 0.3, drift: 22 },
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

  const ease = (value) => (
    value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2
  );

  const animateBurstNode = (config, progress, options = {}) => {
    if (!config.node) {
      return;
    }

    const local = ease(mapRange(progress, config.delay, Math.min(config.delay + 0.42, 1)));
    const wave = Math.sin((progress * Math.PI * 3) + (config.delay * 10)) * (config.drift || 0) * local;
    const rotate = mix(config.fromRotate || 0, config.rotate || 0, local);
    const scaleX = mix(options.fromScaleX ?? options.fromScale ?? 0.18, options.toScaleX ?? options.toScale ?? 1, local);
    const scaleY = mix(options.fromScaleY ?? options.fromScale ?? 0.18, options.toScaleY ?? options.toScale ?? 1, local);
    const opacity = local > 0.02 ? Math.min(local * 1.2, 1) : 0;
    const fromX = config.fromX || 0;
    const fromY = config.fromY || 0;

    config.node.style.opacity = String(opacity);
    config.node.style.transform = `translate3d(${mix(fromX, config.toX, local)}px, ${mix(fromY, config.toY, local) + wave}px, 0) rotate(${rotate}deg) scale3d(${scaleX}, ${scaleY}, 1)`;
  };

  const state = {
    frameRequested: false,
    autoHandoffLocked: false,
    lastScrollY: window.scrollY,
    lastProgress: -1,
    lastOverlay: -1,
    lastPercent: -1,
    lastSceneLabel: "",
    layout: {
      shellTop: 0,
      shellHeight: 1,
      scrollDistance: 1,
      targetTop: 0,
      revealStart: 0,
      revealEnd: 1,
      triggerY: 1,
    },
  };

  let activeMists = mists;
  let activeFruits = fruits;
  let activeProteins = proteins;
  let activeShards = shards;
  let activeBubbles = bubbles;
  let activeMistSet = new Set(mists);
  let activeFruitSet = new Set(fruits);
  let activeProteinSet = new Set(proteins);
  let activeShardSet = new Set(shards);
  let activeBubbleSet = new Set(bubbles);

  const setBurstVisibility = (allNodes, activeSet) => {
    allNodes.forEach((config) => {
      if (!config.node) {
        return;
      }

      if (activeSet.has(config)) {
        config.node.style.opacity = "";
        config.node.style.transform = "";
        return;
      }

      config.node.style.opacity = "0";
      config.node.style.transform = "translate3d(0, 0, 0) scale(0.001)";
    });
  };

  const syncPerformanceMode = () => {
    performanceLite = performanceLiteQuery.matches;
    activeMists = performanceLite ? mists.slice(0, 2) : mists;
    activeFruits = performanceLite ? fruits.filter((_, index) => index % 2 === 0) : fruits;
    activeProteins = performanceLite ? proteins.filter((_, index) => index % 3 === 0) : proteins;
    activeShards = performanceLite ? shards.filter((_, index) => index % 2 === 0) : shards;
    activeBubbles = performanceLite ? bubbles.filter((_, index) => index % 2 === 0) : bubbles;
    activeMistSet = new Set(activeMists);
    activeFruitSet = new Set(activeFruits);
    activeProteinSet = new Set(activeProteins);
    activeShardSet = new Set(activeShards);
    activeBubbleSet = new Set(activeBubbles);

    setBurstVisibility(mists, activeMistSet);
    setBurstVisibility(fruits, activeFruitSet);
    setBurstVisibility(proteins, activeProteinSet);
    setBurstVisibility(shards, activeShardSet);
    setBurstVisibility(bubbles, activeBubbleSet);
  };

  const updateLayout = () => {
    const shellTop = immersiveShell.offsetTop;
    const shellHeight = immersiveShell.offsetHeight;
    const scrollDistance = Math.max(shellHeight - window.innerHeight, 1);

    state.layout.shellTop = shellTop;
    state.layout.shellHeight = shellHeight;
    state.layout.scrollDistance = scrollDistance;

    if (!handoffTarget) {
      state.layout.targetTop = shellTop + scrollDistance;
      state.layout.revealStart = shellTop + scrollDistance;
      state.layout.revealEnd = shellTop + scrollDistance;
      state.layout.triggerY = shellTop + scrollDistance;
      return;
    }

    const targetTop = handoffTarget.offsetTop;
    const revealStart = Math.max(targetTop - (window.innerHeight * 0.82), shellTop + (scrollDistance * 0.72));
    const revealEnd = targetTop - (window.innerHeight * 0.08);
    const triggerY = shellTop + scrollDistance - Math.min(window.innerHeight * 0.06, 32);

    state.layout.targetTop = targetTop;
    state.layout.revealStart = revealStart;
    state.layout.revealEnd = revealEnd;
    state.layout.triggerY = triggerY;
  };

  const getMetrics = () => {
    const sceneProgress = clamp((window.scrollY - state.layout.shellTop) / state.layout.scrollDistance);

    return {
      sceneProgress,
      overlayProgress: clamp(
        (window.scrollY - state.layout.revealStart) / Math.max(state.layout.revealEnd - state.layout.revealStart, 1)
      ),
      triggerY: state.layout.triggerY,
      targetTop: state.layout.targetTop,
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
      stage.style.setProperty("--stage-overlay-scale", mix(1, 1.035, overlayProgress).toFixed(4));
      stage.style.setProperty("--stage-overlay-y", `${mix(0, -18, overlayProgress).toFixed(2)}px`);
    }

    immersiveShell.classList.toggle("is-overlay-hidden", overlayProgress > 0.995);
  };

  const updateSceneLabels = (progress, overlayProgress) => {
    if (!progressLabel || !stateLabel || !meterFill) {
      return;
    }

    const percent = Math.round(progress * 100);
    if (percent !== state.lastPercent) {
      progressLabel.textContent = `${percent}%`;
      meterFill.style.width = `${percent}%`;
      state.lastPercent = percent;
    }

    let nextLabel = "";

    if (progress < 0.12) {
      nextLabel = "Bottle sealed";
    } else if (progress < 0.34) {
      nextLabel = "Pressure rising";
    } else if (progress < 0.64) {
      nextLabel = "Pour in motion";
    } else if (overlayProgress > 0.72) {
      nextLabel = "Main interface entering";
    } else if (progress < 0.88) {
      nextLabel = "Splash fully spread";
    } else {
      nextLabel = "Launch frame locked";
    }

    if (nextLabel !== state.lastSceneLabel) {
      stateLabel.textContent = nextLabel;
      state.lastSceneLabel = nextLabel;
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
    chapterMeta.forEach(({ card, start, end, isRightAligned }) => {
      const midpoint = (start + end) / 2;
      const halfRange = (end - start) / 2;
      const distance = Math.abs(progress - midpoint) / Math.max(halfRange, 0.001);
      const visibility = clamp(1 - distance);
      const eased = ease(visibility);
      const horizontalOffset = isRightAligned
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

    activeMists.forEach((config, index) => {
      animateBurstNode(config, progress, {
        fromScaleX: 0.44,
        fromScaleY: 0.22,
        toScaleX: 1.18 + (index * 0.08),
        toScaleY: 1 + (index * 0.04),
      });
    });

    activeFruits.forEach((config) => {
      animateBurstNode(config, progress, {
        fromScale: 0.12,
        toScale: 1,
      });
    });

    activeProteins.forEach((config) => {
      animateBurstNode(config, progress, {
        fromScale: 0.3,
        toScale: 1,
      });
    });

    activeShards.forEach((config) => {
      animateBurstNode(config, progress, {
        fromScale: 0.24,
        toScale: 1,
      });
    });

    activeBubbles.forEach((config) => {
      animateBurstNode(config, progress, {
        fromScale: 0.28,
        toScale: 1,
      });
    });

    immersiveShell.style.setProperty("--scene-progress", progress.toFixed(4));
    root.style.setProperty("--scene-progress", progress.toFixed(4));
  };

  const maybeAutoHandoff = (metrics) => {
    if (!handoffTarget) {
      return;
    }

    const isScrollingDown = window.scrollY > state.lastScrollY + 1;
    const resetThreshold = metrics.triggerY - (window.innerHeight * 0.35);
    const remainingDistance = Math.abs(metrics.targetTop - window.scrollY);

    if (window.scrollY < resetThreshold) {
      state.autoHandoffLocked = false;
    }

    if (!state.autoHandoffLocked && isScrollingDown && metrics.sceneProgress >= 0.992 && remainingDistance > 12) {
      state.autoHandoffLocked = true;
      window.scrollTo({
        top: metrics.targetTop,
        behavior: prefersReducedMotion || remainingDistance < 96 ? "auto" : "smooth",
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
    const currentY = window.scrollY;
    const lowerBound = state.layout.shellTop - window.innerHeight;
    const upperBound = state.layout.targetTop + window.innerHeight;

    if (currentY < lowerBound || currentY > upperBound) {
      return;
    }

    if (state.frameRequested) {
      return;
    }

    state.frameRequested = true;
    window.requestAnimationFrame(renderFrame);
  };

  const handleResize = () => {
    syncPerformanceMode();
    updateLayout();
    requestRender();
  };

  syncPerformanceMode();
  updateLayout();
  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleResize);
  window.addEventListener("load", handleResize);
  window.addEventListener("pageshow", handleResize);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(handleResize);
  }

  if (performanceLiteQuery.addEventListener) {
    performanceLiteQuery.addEventListener("change", handleResize);
  }

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(immersiveShell);

    if (handoffTarget) {
      resizeObserver.observe(handoffTarget);
    }
  }

  requestRender();
}
