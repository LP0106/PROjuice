import type { QuaternionLike, Vector3Like } from './types';

export const ZERO_VECTOR: Vector3Like = { x: 0, y: 0, z: 0 };

export function vec3(x = 0, y = 0, z = 0): Vector3Like {
  return { x, y, z };
}

export function add(a: Vector3Like, b: Vector3Like): Vector3Like {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function subtract(a: Vector3Like, b: Vector3Like): Vector3Like {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function scale(vector: Vector3Like, factor: number): Vector3Like {
  return {
    x: vector.x * factor,
    y: vector.y * factor,
    z: vector.z * factor
  };
}

export function dot(a: Vector3Like, b: Vector3Like): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function cross(a: Vector3Like, b: Vector3Like): Vector3Like {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

export function length(vector: Vector3Like): number {
  return Math.sqrt(dot(vector, vector));
}

export function distance(a: Vector3Like, b: Vector3Like): number {
  return length(subtract(a, b));
}

export function normalize(vector: Vector3Like): Vector3Like {
  const magnitude = length(vector);
  if (!magnitude) {
    return { ...ZERO_VECTOR };
  }

  return scale(vector, 1 / magnitude);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function rotateAroundAxis(
  vector: Vector3Like,
  axis: Vector3Like,
  angle: number
): Vector3Like {
  const unitAxis = normalize(axis);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const term1 = scale(vector, cos);
  const term2 = scale(cross(unitAxis, vector), sin);
  const term3 = scale(unitAxis, dot(unitAxis, vector) * (1 - cos));

  return add(add(term1, term2), term3);
}

export function steeringDirection(
  forward: Vector3Like,
  yaw: number,
  lift: number
): Vector3Like {
  const afterYaw = rotateAroundAxis(forward, { x: 0, y: 1, z: 0 }, yaw);
  const right = normalize(cross(afterYaw, { x: 0, y: 1, z: 0 }));
  const safeRight = length(right) > 0 ? right : { x: 1, y: 0, z: 0 };

  return normalize(rotateAroundAxis(afterYaw, safeRight, lift));
}

export function quaternionIdentity(): QuaternionLike {
  return { x: 0, y: 0, z: 0, w: 1 };
}

export function mulberry32(seed: number): () => number {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function vectorKey(vector: Vector3Like): string {
  return `${vector.x.toFixed(1)}:${vector.y.toFixed(1)}:${vector.z.toFixed(1)}`;
}
