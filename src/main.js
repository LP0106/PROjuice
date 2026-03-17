document.documentElement.classList.add("has-js");

const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");
const immersiveIntro = document.querySelector("#immersive-intro");
const siteFooter = document.querySelector(".site-footer");
const spillLayer = document.querySelector(".scroll-spill-layer");
const spillSourceBottle = document.querySelector("#bottle-assembly");
const spillSourceMouth = document.querySelector(".bottle-shell");
const yearNode = document.querySelector("#year");
const revealNodes = document.querySelectorAll(".reveal");
const progressBar = document.querySelector("#scroll-progress-bar");
const cursorGlow = document.querySelector(".cursor-glow");
const parallaxNodes = [...document.querySelectorAll("[data-parallax]")];
const frostParallaxNodes = parallaxNodes.filter((node) => node.closest(".page-frost"));
const sceneParallaxNodes = parallaxNodes.filter((node) => !node.closest(".page-frost"));
const sceneParallaxMeta = sceneParallaxNodes.map((node) => ({
  node,
  speed: Number(node.dataset.parallax || "0.08"),
  top: 0,
  half: 0,
}));
const tiltNodes = [...document.querySelectorAll("[data-tilt]")];
const magneticNodes = [...document.querySelectorAll(".magnetic")];
const counterNodes = [...document.querySelectorAll("[data-count]")];
const sliderRoots = [...document.querySelectorAll("[data-slider-root]")];
const faqItems = [...document.querySelectorAll(".faq-item")];
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sectionNodes = [...document.querySelectorAll("main section[id]")];
const navigableSectionMeta = sectionNodes.map((node) => ({
  id: node.id,
  node,
  top: 0,
  height: 0,
}));
const sectionShellNodes = [...document.querySelectorAll(".section-shell")];
const revealMeta = [...revealNodes].map((node) => ({
  node,
  top: 0,
  height: 0,
}));
const sliderStates = [];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
const lowMotionViewportQuery = window.matchMedia("(max-width: 1180px)");
let lowMotionViewport = lowMotionViewportQuery.matches;
const lowPowerDevice = (navigator.hardwareConcurrency || 8) <= 8 || (navigator.deviceMemory && navigator.deviceMemory <= 8);
const sectionShellMeta = sectionShellNodes.map((node) => ({
  node,
  top: 0,
  height: 0,
}));
const spillLayout = {
  startY: 0,
  endY: 1,
  travel: 1,
  layerHeight: 1,
  sourceX: window.innerWidth * 0.5,
};

const flavourData = {
  mango: {
    theme: "mango",
    kicker: "Tropical energy",
    title: "Mango Charge",
    bottle: "Mango Charge",
    description:
      "Mango and passionfruit create a sunny, fast-drinking bottle designed for morning momentum and high visual impact.",
    moment: "Morning momentum",
    texture: "Smooth and bright",
    role: "Hero attention driver",
    meters: {
      juiciness: 92,
      recovery: 72,
      brightness: 90,
    },
    bullets: [
      "Launch flavour designed to win the first taste test.",
      "Best for breakfast runs, pre-class energy and day-start routines.",
      "Warm palette gives the whole brand a premium hero product anchor.",
    ],
    stageTop: "Juice-first finish",
    stageBottom: "Built for recovery",
    floatA: "Taste-led premium positioning",
    floatB: "Scroll-ready packaging and strong fridge stand-out",
  },
  berry: {
    theme: "berry",
    kicker: "Recovery favourite",
    title: "Berry Lift",
    bottle: "Berry Lift",
    description:
      "Berry Lift is cooler, richer and more recovery-coded, built for gym fridges and afternoon reset moments.",
    moment: "Post-workout reset",
    texture: "Velvety and calm",
    role: "Retention and loyalty driver",
    meters: {
      juiciness: 78,
      recovery: 91,
      brightness: 68,
    },
    bullets: [
      "Signals the strongest functional protein message in the range.",
      "Feels premium enough for boutique gyms and sports club counters.",
      "A deeper palette adds mood, seriousness and premium contrast.",
    ],
    stageTop: "Recovery coded",
    stageBottom: "Gym-fridge magnet",
    floatA: "Higher repeat-purchase potential in recovery settings",
    floatB: "Deeper palette gives the brand a premium, cinematic edge",
  },
  lime: {
    theme: "lime",
    kicker: "Clean and crisp",
    title: "Apple Lime Pulse",
    bottle: "Apple Lime Pulse",
    description:
      "Apple Lime Pulse delivers the sharpest freshness cue, giving the brand a cleaner, lighter option for all-day drinking.",
    moment: "Midday refresh",
    texture: "Crisp and cool",
    role: "Freshness proof point",
    meters: {
      juiciness: 84,
      recovery: 66,
      brightness: 95,
    },
    bullets: [
      "Best fit for cafes, lunch runs and lifestyle-led counters.",
      "Bright acidity helps PROjuice feel less like a typical shake.",
      "The cleanest flavour profile strengthens the real-fruit claim.",
    ],
    stageTop: "Freshness led",
    stageBottom: "Cafe-ready signal",
    floatA: "Clean flavour architecture broadens the audience beyond gyms",
    floatB: "A cooler tone sharpens the premium, modern visual identity",
  },
};

const flavourTargets = {
  kicker: document.querySelector("#flavour-kicker"),
  title: document.querySelector("#flavour-title"),
  bottleName: document.querySelector("#flavour-bottle-name"),
  description: document.querySelector("#flavour-description"),
  moment: document.querySelector("#flavour-moment"),
  texture: document.querySelector("#flavour-texture"),
  role: document.querySelector("#flavour-role"),
  juiciness: document.querySelector("#meter-juiciness"),
  recovery: document.querySelector("#meter-recovery"),
  brightness: document.querySelector("#meter-brightness"),
  bullets: document.querySelector("#flavour-bullets"),
  heroBottle: document.querySelector(".hero-bottle-label span"),
  stageTop: document.querySelector(".stage-note-top"),
  stageBottom: document.querySelector(".stage-note-bottom"),
  floatA: document.querySelector(".hero-floating-card-a p"),
  floatB: document.querySelector(".hero-floating-card-b p"),
  heroStage: document.querySelector(".hero-stage"),
  canvas: document.querySelector("#flavour-canvas"),
  chips: [...document.querySelectorAll("[data-flavour-target]")],
};

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const updateFlavour = (key) => {
  const flavour = flavourData[key];
  if (!flavour) {
    return;
  }

  body.dataset.theme = flavour.theme;

  if (flavourTargets.heroStage) {
    flavourTargets.heroStage.className = `hero-stage theme-${flavour.theme}`;
  }

  if (flavourTargets.canvas) {
    flavourTargets.canvas.className = `flavour-canvas theme-${flavour.theme}`;
  }

  if (flavourTargets.kicker) flavourTargets.kicker.textContent = flavour.kicker;
  if (flavourTargets.title) flavourTargets.title.textContent = flavour.title;
  if (flavourTargets.bottleName) flavourTargets.bottleName.textContent = flavour.bottle;
  if (flavourTargets.description) flavourTargets.description.textContent = flavour.description;
  if (flavourTargets.moment) flavourTargets.moment.textContent = flavour.moment;
  if (flavourTargets.texture) flavourTargets.texture.textContent = flavour.texture;
  if (flavourTargets.role) flavourTargets.role.textContent = flavour.role;
  if (flavourTargets.heroBottle) flavourTargets.heroBottle.textContent = flavour.bottle;
  if (flavourTargets.stageTop) flavourTargets.stageTop.textContent = flavour.stageTop;
  if (flavourTargets.stageBottom) flavourTargets.stageBottom.textContent = flavour.stageBottom;
  if (flavourTargets.floatA) flavourTargets.floatA.textContent = flavour.floatA;
  if (flavourTargets.floatB) flavourTargets.floatB.textContent = flavour.floatB;

  if (flavourTargets.juiciness) {
    flavourTargets.juiciness.style.setProperty("--meter-width", `${flavour.meters.juiciness}%`);
  }
  if (flavourTargets.recovery) {
    flavourTargets.recovery.style.setProperty("--meter-width", `${flavour.meters.recovery}%`);
  }
  if (flavourTargets.brightness) {
    flavourTargets.brightness.style.setProperty("--meter-width", `${flavour.meters.brightness}%`);
  }

  if (flavourTargets.bullets) {
    flavourTargets.bullets.innerHTML = flavour.bullets.map((item) => `<li>${item}</li>`).join("");
  }

  flavourTargets.chips.forEach((chip) => {
    const active = chip.dataset.flavourTarget === key;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
};

flavourTargets.chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    updateFlavour(chip.dataset.flavourTarget);
  });
});

updateFlavour("mango");

const animatedCounters = new WeakSet();

const animateCounter = (node) => {
  if (!node || animatedCounters.has(node)) {
    return;
  }

  animatedCounters.add(node);
  const target = Number(node.dataset.count || "0");
  const suffix = node.dataset.suffix || "";
  const duration = 1200;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    node.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      node.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(tick);
};

const setFaqState = (item, open) => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  item.classList.toggle("is-open", open);

  if (button) {
    button.setAttribute("aria-expanded", String(open));
  }

  if (answer) {
    answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0px";
  }
};

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const isOpen = item.classList.contains("is-open");
  setFaqState(item, isOpen);

  if (button) {
    button.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      faqItems.forEach((faqItem) => setFaqState(faqItem, false));
      setFaqState(item, willOpen);
    });
  }
});

window.addEventListener("resize", () => {
  faqItems.forEach((item) => {
    if (item.classList.contains("is-open")) {
      const answer = item.querySelector(".faq-answer");
      if (answer) {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    }
  });
});

sliderRoots.forEach((sliderRoot) => {
  const track = sliderRoot.querySelector("[data-slider-track]");
  const prevButton = sliderRoot.querySelector("[data-slider-prev]");
  const nextButton = sliderRoot.querySelector("[data-slider-next]");

  if (!track || !prevButton || !nextButton) {
    return;
  }

  const sliderState = {
    cards: [],
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    dragDistance: 0,
    isDragging: false,
  };

  const resolveStep = () => {
    const cardSelector = track.dataset.sliderCardSelector || ".roadmap-card, .route-card";
    const firstCard = track.querySelector(cardSelector);
    const trackStyles = window.getComputedStyle(track);
    const gapValue = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "16");

    return firstCard
      ? firstCard.getBoundingClientRect().width + gapValue
      : Math.max(track.getBoundingClientRect().width * 0.82, 260);
  };

  const syncCurrentCard = () => {
    const cardSelector = track.dataset.sliderCardSelector || ".roadmap-card, .route-card";
    sliderState.cards = [...track.querySelectorAll(cardSelector)];

    if (!sliderState.cards.length) {
      sliderRoot.style.setProperty("--slider-progress", "0");
      return;
    }

    const step = resolveStep();
    const currentIndex = Math.max(
      0,
      Math.min(Math.round(track.scrollLeft / Math.max(step, 1)), sliderState.cards.length - 1)
    );

    sliderState.cards.forEach((card, index) => {
      card.classList.toggle("is-current", index === currentIndex);
    });

    const progress = sliderState.cards.length > 1
      ? currentIndex / (sliderState.cards.length - 1)
      : 1;

    sliderRoot.style.setProperty("--slider-progress", progress.toFixed(4));
  };

  const syncSliderState = () => {
    const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth - 4, 0);
    const canScroll = maxScrollLeft > 4;

    sliderRoot.classList.toggle("is-scrollable", canScroll);
    prevButton.disabled = !canScroll || track.scrollLeft <= 4;
    nextButton.disabled = !canScroll || track.scrollLeft >= maxScrollLeft;
    syncCurrentCard();
  };

  const scrollTrack = (direction) => {
    track.scrollBy({
      left: resolveStep() * direction,
      behavior: "smooth",
    });
  };

  const stopDragging = (event) => {
    if (!sliderState.isDragging) {
      return;
    }

    if (event && sliderState.pointerId !== null && event.pointerId !== sliderState.pointerId) {
      return;
    }

    sliderState.isDragging = false;
    sliderState.pointerId = null;
    track.classList.remove("is-dragging");
  };

  prevButton.addEventListener("click", () => scrollTrack(-1));
  nextButton.addEventListener("click", () => scrollTrack(1));
  track.addEventListener("scroll", syncSliderState, { passive: true });

  track.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (event.pointerType === "touch") {
      return;
    }

    if (track.scrollWidth <= track.clientWidth + 4) {
      return;
    }

    sliderState.pointerId = event.pointerId;
    sliderState.startX = event.clientX;
    sliderState.startScrollLeft = track.scrollLeft;
    sliderState.dragDistance = 0;
    sliderState.isDragging = true;

    track.classList.add("is-dragging");

    if (track.setPointerCapture) {
      track.setPointerCapture(event.pointerId);
    }
  });

  track.addEventListener("pointermove", (event) => {
    if (!sliderState.isDragging || event.pointerId !== sliderState.pointerId) {
      return;
    }

    const deltaX = event.clientX - sliderState.startX;
    sliderState.dragDistance = Math.abs(deltaX);
    track.scrollLeft = sliderState.startScrollLeft - deltaX;

    if (sliderState.dragDistance > 6) {
      event.preventDefault();
    }
  });

  track.addEventListener("pointerup", stopDragging);
  track.addEventListener("pointercancel", stopDragging);
  track.addEventListener("lostpointercapture", stopDragging);

  track.addEventListener(
    "click",
    (event) => {
      if (sliderState.dragDistance > 8) {
        event.preventDefault();
        event.stopPropagation();
        sliderState.dragDistance = 0;
      }
    },
    true
  );

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(syncSliderState);
    resizeObserver.observe(track);
  }

  sliderStates.push({ syncSliderState });
  syncSliderState();
});

if (supportsFinePointer && cursorGlow && !prefersReducedMotion) {
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let glowX = pointerX;
  let glowY = pointerY;
  let glowFrame = 0;
  let lastPointerMoveAt = 0;

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    lastPointerMoveAt = performance.now();

    if (!glowFrame) {
      glowFrame = requestAnimationFrame(renderGlow);
    }
  });

  const renderGlow = (now) => {
    glowFrame = 0;
    glowX += (pointerX - glowX) * 0.14;
    glowY += (pointerY - glowY) * 0.14;
    cursorGlow.style.transform = `translate3d(${glowX - 224}px, ${glowY - 224}px, 0)`;

    const isStillEasing =
      Math.abs(pointerX - glowX) > 0.4 ||
      Math.abs(pointerY - glowY) > 0.4;

    if (!document.hidden && (isStillEasing || now - lastPointerMoveAt < 140)) {
      glowFrame = requestAnimationFrame(renderGlow);
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && glowFrame) {
      cancelAnimationFrame(glowFrame);
      glowFrame = 0;
    } else if (!document.hidden && !glowFrame) {
      glowFrame = requestAnimationFrame(renderGlow);
    }
  });

  glowFrame = requestAnimationFrame(renderGlow);
}

if (supportsFinePointer && !prefersReducedMotion) {
  tiltNodes.forEach((node) => {
    node.addEventListener("pointermove", (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
      node.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    });

    node.addEventListener("pointerleave", () => {
      node.style.setProperty("--tilt-x", "0deg");
      node.style.setProperty("--tilt-y", "0deg");
    });
  });

  magneticNodes.forEach((node) => {
    node.addEventListener("pointermove", (event) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.setProperty("--mag-x", `${x * 0.08}px`);
      node.style.setProperty("--mag-y", `${y * 0.08}px`);
    });

    node.addEventListener("pointerleave", () => {
      node.style.setProperty("--mag-x", "0px");
      node.style.setProperty("--mag-y", "0px");
    });
  });
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.65,
    }
  );

  counterNodes.forEach((node) => counterObserver.observe(node));
} else {
  counterNodes.forEach(animateCounter);
}

let scrollTicking = false;
let lastSyncedScrollTop = window.scrollY;

const updateSceneParallaxLayout = () => {
  sceneParallaxMeta.forEach((meta) => {
    const rect = meta.node.getBoundingClientRect();
    meta.top = rect.top + window.scrollY;
    meta.half = rect.height / 2;
  });
};

const updateRevealLayout = () => {
  revealMeta.forEach((meta) => {
    const rect = meta.node.getBoundingClientRect();
    meta.top = rect.top + window.scrollY;
    meta.height = rect.height;
  });
};

const updateNavigableSectionLayout = () => {
  navigableSectionMeta.forEach((meta) => {
    const rect = meta.node.getBoundingClientRect();
    meta.top = rect.top + window.scrollY;
    meta.height = rect.height;
  });
};

const updateSectionShellLayout = () => {
  sectionShellMeta.forEach((meta) => {
    const rect = meta.node.getBoundingClientRect();
    meta.top = rect.top + window.scrollY;
    meta.height = rect.height;
  });
};

const updateSpillLayout = () => {
  if (!spillLayer) {
    return;
  }

  const docHeight = Math.max(document.documentElement.scrollHeight, body.scrollHeight, window.innerHeight);
  const sourceNode = spillSourceMouth || spillSourceBottle;
  const sourceRect = sourceNode ? sourceNode.getBoundingClientRect() : null;
  const introAnchor = sourceRect
    ? window.scrollY + sourceRect.top + (sourceRect.height * 0.06)
    : immersiveIntro
      ? immersiveIntro.offsetTop + (window.innerHeight * 0.2)
      : window.innerHeight * 0.2;
  const sourceX = sourceRect
    ? sourceRect.left + (sourceRect.width * 0.5)
    : window.innerWidth * 0.58;
  const footerAnchor = siteFooter
    ? siteFooter.offsetTop - Math.min(window.innerHeight * 0.12, 56)
    : docHeight - (window.innerHeight * 0.24);
  const startY = Math.max(180, introAnchor);
  const endY = Math.max(startY + (window.innerHeight * 1.2), Math.min(docHeight - 64, footerAnchor));

  spillLayout.startY = startY;
  spillLayout.endY = endY;
  spillLayout.travel = Math.max(endY - startY, 1);
  spillLayout.layerHeight = docHeight;
  spillLayout.sourceX = sourceX;
  const centerX = window.innerWidth * 0.5;
  const sourceOffset = sourceX - centerX;
  const bridgeWidth = Math.max(Math.abs(sourceOffset) + 84, 84);
  const bridgeRotate = Math.max(Math.min(sourceOffset * 0.04, 10), -10);

  spillLayer.style.setProperty("--spill-layer-height", `${docHeight}px`);
  spillLayer.style.setProperty("--spill-start-y", `${startY.toFixed(2)}px`);
  spillLayer.style.setProperty("--spill-base-x", `${centerX.toFixed(2)}px`);
  spillLayer.style.setProperty("--spill-source-offset-x", `${sourceOffset.toFixed(2)}px`);
  spillLayer.style.setProperty("--spill-bridge-width", `${bridgeWidth.toFixed(2)}px`);
  spillLayer.style.setProperty("--spill-bridge-shift", `${(sourceOffset * 0.5).toFixed(2)}px`);
  spillLayer.style.setProperty("--spill-bridge-rotate", `${bridgeRotate.toFixed(2)}deg`);
  spillLayer.style.setProperty("--spill-ground-y", `${endY.toFixed(2)}px`);
};

const syncCurrentNav = (_scrollTop, viewportHeight) => {
  if (!navLinks.length || !navigableSectionMeta.length) {
    return;
  }

  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const anchorY = headerHeight + Math.min(viewportHeight * 0.16, 132);
  let currentId = null;

  navigableSectionMeta.forEach((meta) => {
    const rect = meta.node.getBoundingClientRect();

    if (anchorY >= rect.top && anchorY < rect.bottom) {
      currentId = meta.id;
    } else if (rect.top <= anchorY) {
      currentId = meta.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-current", Boolean(currentId) && link.getAttribute("href") === `#${currentId}`);
  });
};

const syncScrollEffects = () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight - viewportHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  const scrollDirection = scrollTop > lastSyncedScrollTop ? 1 : scrollTop < lastSyncedScrollTop ? -1 : 0;
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const revealStartLine = viewportHeight;
  const revealEndLine = Math.max(headerHeight + 40, viewportHeight * 0.52);
  const revealTravel = Math.max(revealStartLine - revealEndLine, 1);

  if (progressBar) {
    progressBar.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);
  }

  if (header) {
    header.classList.toggle("is-scrolled", scrollTop > 18);
  }

  syncCurrentNav(scrollTop, viewportHeight);

  frostParallaxNodes.forEach((node) => {
    const speed = Number(node.dataset.parallax || "0.08");
    const offset = scrollTop * speed * -0.25;
    node.style.setProperty("--parallax-offset", `${Math.max(Math.min(offset, 80), -80)}px`);
  });

  sceneParallaxMeta.forEach((meta) => {
    const distanceFromCenter = (meta.top + meta.half) - (scrollTop + (viewportHeight / 2));
    const offset = distanceFromCenter * -meta.speed;

    meta.node.style.setProperty("--parallax-offset", `${Math.max(Math.min(offset, 80), -80)}px`);
  });

  revealMeta.forEach((meta) => {
    if (lowMotionViewport) {
      meta.node.style.setProperty("--reveal-progress", "1");
      meta.node.style.setProperty("--reveal-shift", "0px");
      meta.node.style.setProperty("--reveal-scale", "1");
      return;
    }

    const rect = meta.node.getBoundingClientRect();
    const revealProgress = clamp((revealStartLine - rect.top) / revealTravel);

    meta.node.style.setProperty("--reveal-progress", revealProgress.toFixed(4));
    meta.node.style.setProperty("--reveal-shift", `${((1 - revealProgress) * 26).toFixed(2)}px`);
    meta.node.style.setProperty("--reveal-scale", `${(0.982 + (revealProgress * 0.018)).toFixed(4)}`);
  });

  sectionShellMeta.forEach((meta) => {
    if (lowMotionViewport) {
      meta.node.style.setProperty("--section-progress", "0.5");
      meta.node.style.setProperty("--section-progress-offset", "0");
      meta.node.style.setProperty("--section-visibility", "0.7");
      meta.node.style.setProperty("--section-energy", "0.45");
      meta.node.style.setProperty("--section-direction", "0");
      meta.node.style.setProperty("--section-shift", "0px");
      meta.node.style.setProperty("--section-shift-y", "0px");
      meta.node.style.setProperty("--section-glow-x", "46%");
      meta.node.style.setProperty("--section-glow-y", "34%");
      meta.node.style.setProperty("--section-glow-opacity", "0.28");
      return;
    }

    const rect = meta.node.getBoundingClientRect();
    const sectionHeight = Math.max(rect.height, 1);
    const centerDistance = (rect.top + (sectionHeight / 2)) - (viewportHeight / 2);
    const normalized = clamp((revealStartLine - rect.top) / Math.max(sectionHeight + (viewportHeight * 0.18), 1));
    const sectionProgress = clamp((revealStartLine - rect.top) / Math.max(sectionHeight + (viewportHeight * 0.08), 1));
    const progressOffset = sectionProgress - 0.5;
    const visibility = clamp((revealStartLine - rect.top) / revealTravel);
    const shift = Math.max(Math.min(centerDistance * -0.055, 34), -34);
    const glowBand = 1 - Math.abs((normalized * 2) - 1);
    const energy = clamp((visibility * 0.76) + (glowBand * 0.24));

    meta.node.style.setProperty("--section-progress", sectionProgress.toFixed(4));
    meta.node.style.setProperty("--section-progress-offset", progressOffset.toFixed(4));
    meta.node.style.setProperty("--section-visibility", visibility.toFixed(4));
    meta.node.style.setProperty("--section-energy", energy.toFixed(4));
    meta.node.style.setProperty("--section-direction", String(scrollDirection));
    meta.node.style.setProperty("--section-shift", `${shift.toFixed(2)}px`);
    meta.node.style.setProperty("--section-shift-y", `${(shift * -0.35).toFixed(2)}px`);
    meta.node.style.setProperty("--section-glow-x", `${(18 + (normalized * 56)).toFixed(2)}%`);
    meta.node.style.setProperty("--section-glow-y", `${(12 + (glowBand * 40)).toFixed(2)}%`);
    meta.node.style.setProperty("--section-glow-opacity", `${(0.24 + (glowBand * 0.48)).toFixed(3)}`);
  });

  if (spillLayer) {
    const streamProbe = scrollTop + (viewportHeight * 0.78);
    const streamProgress = clamp((streamProbe - spillLayout.startY) / spillLayout.travel);
    const streamReach = spillLayout.startY + (spillLayout.travel * streamProgress);
    const streamHeight = Math.max(streamReach - spillLayout.startY, 0);
    const groundProgress = clamp((streamProgress - 0.84) / 0.16);
    const centerX = window.innerWidth * 0.5;
    const sourceOffset = spillLayout.sourceX - centerX;
    const bridgeWidth = Math.max(Math.abs(sourceOffset) + 84, 84);
    const bridgeRotate = Math.max(Math.min(sourceOffset * 0.04, 10), -10);
    const laneAmplitude = lowMotionViewport ? 5 : 14;
    const laneX = (
      Math.sin((streamProgress * Math.PI * 2.3) + 0.35) * laneAmplitude +
      Math.sin((scrollTop * 0.0011) + 0.8) * (laneAmplitude * 0.4)
    );

    spillLayer.style.setProperty("--spill-height", `${streamHeight.toFixed(2)}px`);
    spillLayer.style.setProperty("--spill-progress", streamProgress.toFixed(4));
    spillLayer.style.setProperty("--spill-base-x", `${centerX.toFixed(2)}px`);
    spillLayer.style.setProperty("--spill-source-offset-x", `${sourceOffset.toFixed(2)}px`);
    spillLayer.style.setProperty("--spill-bridge-width", `${bridgeWidth.toFixed(2)}px`);
    spillLayer.style.setProperty("--spill-bridge-shift", `${(sourceOffset * 0.5).toFixed(2)}px`);
    spillLayer.style.setProperty("--spill-bridge-rotate", `${bridgeRotate.toFixed(2)}deg`);
    spillLayer.style.setProperty("--spill-lane-x", `${laneX.toFixed(2)}px`);
    spillLayer.style.setProperty("--spill-ground-progress", groundProgress.toFixed(4));
  }

  lastSyncedScrollTop = scrollTop;
  scrollTicking = false;
};

const requestScrollSync = () => {
  if (!scrollTicking) {
    requestAnimationFrame(syncScrollEffects);
    scrollTicking = true;
  }
};

const syncViewportMode = () => {
  lowMotionViewport = lowMotionViewportQuery.matches;
  body.classList.toggle("performance-lite", lowMotionViewport || lowPowerDevice);
};

window.addEventListener("scroll", requestScrollSync, { passive: true });
window.addEventListener("resize", () => {
  syncViewportMode();
  updateSceneParallaxLayout();
  updateRevealLayout();
  updateNavigableSectionLayout();
  updateSectionShellLayout();
  updateSpillLayout();
  sliderStates.forEach(({ syncSliderState }) => syncSliderState());
  requestScrollSync();
});
window.addEventListener("load", () => {
  updateSceneParallaxLayout();
  updateRevealLayout();
  updateNavigableSectionLayout();
  updateSectionShellLayout();
  updateSpillLayout();
  sliderStates.forEach(({ syncSliderState }) => syncSliderState());
  syncScrollEffects();
});

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    updateSceneParallaxLayout();
    updateRevealLayout();
    updateNavigableSectionLayout();
    updateSectionShellLayout();
    updateSpillLayout();
    sliderStates.forEach(({ syncSliderState }) => syncSliderState());
    requestScrollSync();
  });
}

if (lowMotionViewportQuery.addEventListener) {
  lowMotionViewportQuery.addEventListener("change", () => {
    syncViewportMode();
    requestScrollSync();
  });
}

syncViewportMode();
updateSceneParallaxLayout();
updateRevealLayout();
updateNavigableSectionLayout();
updateSectionShellLayout();
updateSpillLayout();
syncScrollEffects();
