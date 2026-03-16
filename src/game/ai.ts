import { ARENA_CONFIG } from './config';
import {
  clamp,
  cross,
  distance,
  dot,
  normalize,
  subtract
} from './math';
import type {
  AITarget,
  ArenaConfig,
  GameState,
  PlayerInputState,
  SnakeEntity,
  Vector3Like
} from './types';

function snakeHead(snake: SnakeEntity): Vector3Like {
  return snake.segments[0]?.position ?? { x: 0, y: 0, z: 0 };
}

export function rankAiTargets(
  state: GameState,
  snakeId: string,
  config: ArenaConfig = ARENA_CONFIG
): AITarget[] {
  const snake = state.snakes.find((entry) => entry.id === snakeId);

  if (!snake || !snake.alive) {
    return [];
  }

  const head = snakeHead(snake);
  const center = {
    x: (config.bounds.min.x + config.bounds.max.x) / 2,
    y: (config.bounds.min.y + config.bounds.max.y) / 2,
    z: (config.bounds.min.z + config.bounds.max.z) / 2
  };

  const targets: AITarget[] = state.pickups
    .filter((pickup) => pickup.active)
    .map((pickup) => {
      const metric = distance(head, pickup.position);
      return {
        kind: 'pickup',
        id: pickup.id,
        position: pickup.position,
        distance: metric,
        score: 130 - metric * 5
      };
    });

  for (const enemy of state.snakes) {
    if (enemy.id === snakeId || !enemy.alive) {
      continue;
    }

    const enemyHead = snakeHead(enemy);
    const metric = distance(head, enemyHead);
    const pressureBonus = snake.segments.length >= enemy.segments.length ? 20 : -16;
    targets.push({
      kind: 'enemy',
      id: enemy.id,
      position: enemyHead,
      distance: metric,
      score: 110 - metric * 4 + pressureBonus + (enemy.attacking ? 8 : 0)
    });
  }

  targets.push({
    kind: 'center',
    id: 'arena-center',
    position: center,
    distance: distance(head, center),
    score: 40 - distance(head, center)
  });

  return targets.sort((left, right) => right.score - left.score);
}

function signedPlanarTurn(
  forward: Vector3Like,
  targetDirection: Vector3Like
): number {
  const forwardFlat = normalize({ x: forward.x, y: 0, z: forward.z });
  const targetFlat = normalize({
    x: targetDirection.x,
    y: 0,
    z: targetDirection.z
  });

  const sideways = cross(forwardFlat, targetFlat).y;
  const alignment = dot(forwardFlat, targetFlat);
  return clamp(sideways + (1 - alignment) * Math.sign(sideways || 1), -1, 1);
}

export function chooseAiInput(
  state: GameState,
  snakeId: string,
  config: ArenaConfig = ARENA_CONFIG
): PlayerInputState {
  const snake = state.snakes.find((entry) => entry.id === snakeId);

  if (!snake || !snake.alive) {
    return { thrust: 0, yaw: 0, lift: 0, boosting: false };
  }

  const head = snakeHead(snake);
  const [primaryTarget] = rankAiTargets(state, snakeId, config);
  const targetPosition = primaryTarget?.position ?? { x: 0, y: 0, z: 0 };
  const desired = normalize(subtract(targetPosition, head));
  const yaw = signedPlanarTurn(snake.forward, desired);
  const lift = clamp((desired.y - snake.forward.y) * 2.5, -1, 1);
  const nearBoundary =
    Math.abs(head.x) > config.bounds.max.x - 3 ||
    Math.abs(head.y) > config.bounds.max.y - 3 ||
    Math.abs(head.z) > config.bounds.max.z - 3;

  return {
    thrust: nearBoundary ? 0.84 : 1,
    yaw: nearBoundary ? yaw * 1.4 : yaw,
    lift: nearBoundary ? clamp(lift - Math.sign(head.y) * 0.4, -1, 1) : lift,
    boosting:
      primaryTarget?.kind === 'enemy' &&
      primaryTarget.distance < 8 &&
      snake.segments.length >=
        (state.snakes.find((entry) => entry.id === primaryTarget.id)?.segments.length ?? 0)
  };
}
