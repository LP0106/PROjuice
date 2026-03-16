import { ARENA_CONFIG, PLAYER_ID } from './config';
import {
  add,
  distance,
  mulberry32,
  normalize,
  scale,
  subtract,
  vectorKey,
  ZERO_VECTOR
} from './math';
import type {
  ArenaConfig,
  CameraMode,
  CombatEvent,
  GameState,
  Pickup,
  SnakeEntity,
  SnakeSegment,
  SnakeSpawn,
  Vector3Like
} from './types';

const CAMERA_NEXT: Record<CameraMode, CameraMode> = {
  tactical: 'chase',
  chase: 'tactical'
};

function buildSegments(
  spawn: SnakeSpawn,
  length: number,
  spacing: number,
  radius: number
): SnakeSegment[] {
  const forward = normalize(spawn.forward);
  const tailDirection = scale(forward, -spacing);

  return Array.from({ length }, (_, index) => {
    const position = add(spawn.position, scale(tailDirection, index));
    return {
      id: `${spawn.snakeId}-segment-${index}`,
      position,
      radius,
      role:
        index === 0 ? 'head' : index === length - 1 ? 'tail' : 'body'
    };
  });
}

function buildSnake(
  spawn: SnakeSpawn,
  index: number,
  config: ArenaConfig
): SnakeEntity {
  const segments = buildSegments(
    spawn,
    config.initialSnakeLength,
    config.snakeSegmentSpacing,
    config.snakeRadius
  );

  return {
    id: spawn.snakeId,
    name: spawn.snakeId === PLAYER_ID ? 'Player' : `Hunter ${index}`,
    color:
      spawn.snakeId === PLAYER_ID
        ? '#69c4ff'
        : ['#ff6f91', '#ffc857', '#83f28f'][index - 1] ?? '#f1f5ff',
    isPlayer: spawn.snakeId === PLAYER_ID,
    alive: true,
    attacking: false,
    queuedGrowth: 0,
    segments,
    rigidBodies: [],
    velocity: scale(normalize(spawn.forward), 8),
    forward: normalize(spawn.forward),
    respawnTimer: 0
  };
}

function initialPickups(config: ArenaConfig): Pickup[] {
  return config.pickupSpawnPoints.slice(0, 4).map((position, index) => ({
    id: `pickup-${index + 1}`,
    position,
    active: true
  }));
}

export function createInitialState(
  config: ArenaConfig = ARENA_CONFIG,
  seed = 7
): GameState {
  return {
    snakes: config.snakeSpawns.map((spawn, index) =>
      buildSnake(spawn, index, config)
    ),
    arenaObjects: config.arenaObjects,
    pickups: initialPickups(config),
    cameraMode: 'tactical',
    score: 0,
    status: 'running',
    message: 'WebGL2 arena initialized. Hunt the rival snakes.',
    tick: 0,
    seed
  };
}

function patchSnake(
  state: GameState,
  snakeId: string,
  updater: (snake: SnakeEntity) => SnakeEntity
): GameState {
  return {
    ...state,
    snakes: state.snakes.map((snake) =>
      snake.id === snakeId ? updater(snake) : snake
    )
  };
}

export function setPaused(state: GameState, paused: boolean): GameState {
  return {
    ...state,
    status: paused ? 'paused' : 'running',
    message: paused ? 'Simulation paused.' : 'Simulation resumed.'
  };
}

export function togglePause(state: GameState): GameState {
  return setPaused(state, state.status !== 'paused');
}

export function toggleCamera(state: GameState): GameState {
  return {
    ...state,
    cameraMode: CAMERA_NEXT[state.cameraMode]
  };
}

export function restartState(
  config: ArenaConfig = ARENA_CONFIG,
  seed = 7
): GameState {
  return createInitialState(config, seed);
}

function choosePickupSpawn(
  state: GameState,
  pickupId: string,
  config: ArenaConfig
): Vector3Like {
  const occupied = new Set<string>();

  for (const snake of state.snakes) {
    if (!snake.alive) {
      continue;
    }
    for (const segment of snake.segments) {
      occupied.add(vectorKey(segment.position));
    }
  }

  for (const pickup of state.pickups) {
    if (pickup.id === pickupId || !pickup.active) {
      continue;
    }
    occupied.add(vectorKey(pickup.position));
  }

  const validPoints = config.pickupSpawnPoints.filter((point) => {
    const key = vectorKey(point);
    if (occupied.has(key)) {
      return false;
    }

    return state.snakes.every((snake) => {
      const head = snake.segments[0];
      return !head || distance(point, head.position) > 2.5;
    });
  });

  if (validPoints.length === 0) {
    return config.pickupSpawnPoints[0];
  }

  const random = mulberry32(state.seed + state.tick + pickupId.length);
  const selection = Math.floor(random() * validPoints.length);
  return validPoints[selection];
}

export function consumePickup(
  state: GameState,
  snakeId: string,
  pickupId: string,
  config: ArenaConfig = ARENA_CONFIG
): GameState {
  const snake = state.snakes.find((entry) => entry.id === snakeId);
  const pickup = state.pickups.find((entry) => entry.id === pickupId);

  if (!snake || !snake.alive || !pickup || !pickup.active) {
    return state;
  }

  const respawnPoint = choosePickupSpawn(state, pickupId, config);
  const nextState = patchSnake(state, snakeId, (entry) => ({
    ...entry,
    queuedGrowth: Math.min(
      entry.queuedGrowth + 1,
      config.maxSnakeLength - entry.segments.length
    )
  }));

  return {
    ...nextState,
    score: snake.isPlayer ? nextState.score + 1 : nextState.score,
    message: snake.isPlayer
      ? 'Energy core captured. Mass increasing.'
      : `${snake.name} stole an energy core.`,
    pickups: nextState.pickups.map((entry) =>
      entry.id === pickupId
        ? {
            ...entry,
            position: respawnPoint,
            active: true
          }
        : entry
    )
  };
}

export function applyQueuedGrowth(
  state: GameState,
  snakeId: string,
  config: ArenaConfig = ARENA_CONFIG,
  units = 1
): GameState {
  return patchSnake(state, snakeId, (snake) => {
    if (!snake.alive || snake.queuedGrowth <= 0) {
      return snake;
    }

    let segments = [...snake.segments];
    let remaining = snake.queuedGrowth;

    for (
      let count = 0;
      count < units &&
      remaining > 0 &&
      segments.length < config.maxSnakeLength;
      count += 1
    ) {
      const tail = segments[segments.length - 1];
      const beforeTail = segments[segments.length - 2] ?? tail;
      const tailDirection = normalize(subtract(tail.position, beforeTail.position));
      const fallbackDirection =
        tailDirection.x === 0 && tailDirection.y === 0 && tailDirection.z === 0
          ? scale(snake.forward, -1)
          : tailDirection;

      segments = [
        ...segments.map((segment, index, list) => ({
          ...segment,
          role:
            index === 0
              ? 'head'
              : index === list.length - 1
                ? 'tail'
                : 'body'
        })),
        {
          id: `${snake.id}-segment-${segments.length}`,
          position: add(
            tail.position,
            scale(fallbackDirection, config.snakeSegmentSpacing)
          ),
          radius: config.snakeRadius,
          role: 'tail'
        }
      ];

      remaining -= 1;
    }

    return {
      ...snake,
      queuedGrowth: remaining,
      segments
    };
  });
}

function respawnSnake(
  snake: SnakeEntity,
  config: ArenaConfig
): SnakeEntity {
  const spawn =
    config.snakeSpawns.find((entry) => entry.snakeId === snake.id) ??
    config.snakeSpawns[0];

  return {
    ...buildSnake(
      spawn,
      config.snakeSpawns.findIndex((entry) => entry.snakeId === snake.id),
      config
    ),
    color: snake.color,
    isPlayer: snake.isPlayer,
    name: snake.name
  };
}

function destroySnake(
  snake: SnakeEntity,
  config: ArenaConfig
): SnakeEntity {
  return {
    ...snake,
    alive: false,
    attacking: false,
    queuedGrowth: 0,
    rigidBodies: [],
    velocity: { ...ZERO_VECTOR },
    respawnTimer: config.respawnFrames
  };
}

export function resolveCombat(
  state: GameState,
  events: CombatEvent[],
  config: ArenaConfig = ARENA_CONFIG
): GameState {
  if (events.length === 0) {
    return state;
  }

  const killed = new Set<string>();
  let nextState = state;

  for (const event of events) {
    if (event.kind === 'head-to-head') {
      killed.add(event.attackerId);
      killed.add(event.victimId);
      continue;
    }

    if (!killed.has(event.victimId)) {
      nextState = patchSnake(nextState, event.attackerId, (snake) => ({
        ...snake,
        queuedGrowth: Math.min(
          config.maxSnakeLength - snake.segments.length,
          snake.queuedGrowth + snake.segments.length
        )
      }));
      killed.add(event.victimId);
    }
  }

  nextState = {
    ...nextState,
    snakes: nextState.snakes.map((snake) =>
      killed.has(snake.id) ? destroySnake(snake, config) : snake
    )
  };

  const playerKilled = killed.has(PLAYER_ID);
  const message = playerKilled
    ? 'Player hull shattered. Respawn protocol engaged.'
    : events.some((event) => event.kind === 'head-to-head')
      ? 'Head-on collision detected.'
      : 'Boost impact confirmed. Rival biomass transferred.';

  return {
    ...nextState,
    message
  };
}

export function advanceRespawns(
  state: GameState,
  config: ArenaConfig = ARENA_CONFIG
): GameState {
  return {
    ...state,
    tick: state.tick + 1,
    snakes: state.snakes.map((snake) => {
      if (snake.alive || snake.respawnTimer <= 0) {
        return snake;
      }

      if (snake.respawnTimer === 1) {
        return respawnSnake(snake, config);
      }

      return {
        ...snake,
        respawnTimer: snake.respawnTimer - 1
      };
    })
  };
}

export function syncSnakePose(
  state: GameState,
  snakeId: string,
  segments: SnakeSegment[],
  forward: Vector3Like,
  velocity: Vector3Like,
  rigidBodies: string[]
): GameState {
  return patchSnake(state, snakeId, (snake) => ({
    ...snake,
    segments,
    forward: normalize(forward),
    velocity,
    rigidBodies
  }));
}

export function setSnakeAttackState(
  state: GameState,
  snakeId: string,
  attacking: boolean
): GameState {
  return patchSnake(state, snakeId, (snake) => ({
    ...snake,
    attacking
  }));
}
