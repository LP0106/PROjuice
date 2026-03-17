document.body.classList.add("immersive-enhanced");

const root = document.documentElement;
const bottle = document.querySelector("#bottle-assembly");
const cap = document.querySelector("#scene-cap");
const liquid = document.querySelector("#bottle-liquid");
const meterFill = document.querySelector("#scene-meter-fill");
const progressLabel = document.querySelector("#scene-progress-label");
const stateLabel = document.querySelector("#scene-state-label");
const chapterCards = [...document.querySelectorAll(".chapter-card")];

const ribbons = [
  { node: document.querySelector(".ribbon-a"), toX: -420, toY: -280, rotate: -30, scale: 1.6, delay: 0.12 },
  { node: document.querySelector(".ribbon-b"), toX: -280, toY: -210, rotate: -16, scale: 1.25, delay: 0.18 },
  { node: document.querySelector(".ribbon-c"), toX: 250, toY: -250, rotate: 18, scale: 1.22, delay: 0.24 },
  { node: document.querySelector(".ribbon-d"), toX: 420, toY: -170, rotate: 34, scale: 1.38, delay: 0.28 },
  { node: document.querySelector(".ribbon-e"), toX: -170, toY: 20, rotate: 8, scale: 0.88, delay: 0.32 },
  { node: document.querySelector(".ribbon-f"), toX: 160, toY: 42, rotate: -6, scale: 0.84, delay: 0.36 },
];

const fruits = [
  { node: document.querySelector(".fruit-a"), toX: -430, toY: -230, rotate: 260, delay: 0.14, drift: 34 },
  { node: document.querySelector(".fruit-b"), toX: -270, toY: -340, rotate: 210, delay: 0.18, drift: 28 },
  { node: document.querySelector(".fruit-c"), toX: -160, toY: -120, rotate: 320, delay: 0.24, drift: 20 },
  { node: document.querySelector(".fruit-d"), toX: 240, toY: -320, rotate: 220, delay: 0.18, drift: 30 },
  { node: document.querySelector(".fruit-e"), toX: 360, toY: -180, rotate: 300, delay: 0.24, drift: 24 },
  { node: document.querySelector(".fruit-f"), toX: 490, toY: -90, rotate: 260, delay: 0.32, drift: 22 },
  { node: document.querySelector(".fruit-g"), toX: -110, toY: 40, rotate: 180, delay: 0.28, drift: 18 },
  { node: document.querySelector(".fruit-h"), toX: 120, toY: 60, rotate: 240, delay: 0.34, drift: 16 },
  { node: document.querySelector(".fruit-i"), toX: 310, toY: 16, rotate: 200, delay: 0.38, drift: 20 },
];

const proteins = [
  { node: document.querySelector(".protein-a"), toX: -360, toY: -170, delay: 0.20, drift: 20 },
  { node: document.querySelector(".protein-b"), toX: -330, toY: -290, delay: 0.22, drift: 18 },
  { node: document.querySelector(".protein-c"), toX: -220, toY: -240, delay: 0.26, drift: 24 },
  { node: document.querySelector(".protein-d"), toX: -90, toY: -290, delay: 0.30, drift: 16 },
  { node: document.querySelector(".protein-e"), toX: 44, toY: -260, delay: 0.34, drift: 14 },
  { node: document.querySelector(".protein-f"), toX: 184, toY: -230, delay: 0.30, drift: 20 },
  { node: document.querySelector(".protein-g"), toX: 300, toY: -180, delay: 0.28, drift: 22 },
  { node: document.querySelector(".protein-h"), toX: 380, toY: -110, delay: 0.32, drift: 20 },
  { node: document.querySelector(".protein-i"), toX: 438, toY: -40, delay: 0.36, drift: 18 },
  { node: document.querySelector(".protein-j"), toX: -230, toY: 10, delay: 0.38, drift: 15 },
  { node: document.querySelector(".protein-k"), toX: 80, toY: 34, delay: 0.42, drift: 16 },
  { node: document.querySelector(".protein-l"), toX: 250, toY: 50, delay: 0.46, drift: 14 },
];

const shards = [
  { node: document.querySelector(".shard-a"), toX: -300, toY: -200, rotate: -34, delay: 0.23 },
  { node: document.querySelector(".shard-b"), toX: -160, toY: -300, rotate: -12, delay: 0.27 },
  { node: document.querySelector(".shard-c"), toX: 120, toY: -300, rotate: 16, delay: 0.31 },
  { node: document.querySelector(".shard-d"), toX: 260, toY: -180, rotate: 32, delay: 0.35 },
  { node: document.querySelector(".shard-e"), toX: -70, toY: -120, rotate: -18, delay: 0.39 },
  { node: document.querySelector(".shard-f"), toX: 180, toY: 0, rotate: 12, delay: 0.44 },
];

const bubbles = [
  { node: document.querySelector(".bubble-a"), toX: -250, toY: -140, delay: 0.18, drift: 24 },
  { node: document.querySelector(".bubble-b"), toX: -120, toY: -220, delay: 0.24, drift: 20 },
  { node: document.querySelector(".bubble-c"), toX: 40, toY: -200, delay: 0.28, drift: 18 },
  { node: document.querySelector(".bubble-d"), toX: 170, toY: -120, delay: 0.33, drift: 16 },
  { node: document.querySelector(".bubble-e"), toX: 290, toY: -70, delay: 0.38, drift: 14 },
  { node: document.querySelector(".bubble-f"), toX: 120, toY: 20, delay: 0.44, drift: 12 },
];

const mapRange = (value, start, end) => {
  if (end === start) {
    return 0;
  }

  return Math.min(Math.max((value - start) / (end - start), 0), 1);
};

const mix = (start, end, amount) => start + (end - start) * amount;

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
  const opacity = local > 0.02 ? Math.min(local * 1.25, 1) : 0;

  config.node.style.opacity = String(opacity);
  config.node.style.transform = `translate3d(${mix(0, config.toX, local)}px, ${mix(0, config.toY, local) + wave}px, 0) rotate(${rotate}deg) scale(${scale})`;
};

chapterCards.forEach((card) => {
  const start = Number(card.dataset.start || "0");
  const end = Number(card.dataset.end || "1");
  card.dataset.rangeStart = String(start);
  card.dataset.rangeEnd = String(end);
});

let targetProgress = 0;
let smoothProgress = 0;

const getScrollProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  return scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
};

const updateSceneLabels = (progress) => {
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
  } else if (progress < 0.88) {
    stateLabel.textContent = "Splash fully spread";
  } else {
    stateLabel.textContent = "Launch frame locked";
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
  bottle.style.setProperty("--bottle-scale", `${mix(1, 1.05, release)}`);

  cap.style.setProperty("--cap-x", `${mix(0, -72, tip)}px`);
  cap.style.setProperty("--cap-y", `${mix(0, -108, tip)}px`);
  cap.style.setProperty("--cap-rotate", `${mix(0, -120, tip)}deg`);

  liquid.style.setProperty("--liquid-fill", `${mix(1, 0.22, release)}`);
  liquid.style.setProperty("--liquid-opacity", `${mix(1, 0.68, release)}`);
};

const updateBackground = (progress) => {
  const stage = document.querySelector(".experience-stage");
  const haloA = document.querySelector(".stage-halo-a");
  const haloB = document.querySelector(".stage-halo-b");
  const haloC = document.querySelector(".stage-halo-c");
  const rings = [...document.querySelectorAll(".rewind-ring")];

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
    const visibility = Math.min(Math.max(1 - distance, 0), 1);
    const eased = ease(visibility);

    card.style.opacity = String(mix(0.16, 1, eased));
    card.style.transform = `translate3d(0, ${mix(42, 0, eased)}px, 0) scale(${mix(0.95, 1, eased)})`;
    card.classList.toggle("is-active", visibility > 0.3);
  });
};

const renderScene = (progress) => {
  updateSceneLabels(progress);
  updateBottle(progress);
  updateBackground(progress);
  updateChapters(progress);

  ribbons.forEach((config, index) => {
    animateBurstNode(config, progress, {
      fromScale: 0.08,
      toScale: 1 + index * 0.08,
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

  root.style.setProperty("--scene-progress", progress.toFixed(4));
};

const tick = () => {
  targetProgress = getScrollProgress();
  smoothProgress += (targetProgress - smoothProgress) * 0.085;

  if (Math.abs(targetProgress - smoothProgress) < 0.0006) {
    smoothProgress = targetProgress;
  }

  renderScene(smoothProgress);
  requestAnimationFrame(tick);
};

renderScene(0);
requestAnimationFrame(tick);
