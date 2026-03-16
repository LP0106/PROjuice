import type { ArenaConfig, ArenaObjectSpec, Vector3Like } from './types';

export const PLAYER_ID = 'player-1';
export const AI_IDS = ['ai-1', 'ai-2', 'ai-3'] as const;
export const FIXED_TIMESTEP = 1 / 60;
export const MAX_FRAME_STEPS = 3;

const bounds = {
  min: { x: -18, y: -12, z: -18 },
  max: { x: 18, y: 12, z: 18 }
};

const pickupSpawnPoints: Vector3Like[] = [
  { x: 0, y: 0, z: 0 },
  { x: 8, y: 5, z: 8 },
  { x: -8, y: -4, z: 7 },
  { x: 10, y: -6, z: -5 },
  { x: -11, y: 3, z: -8 },
  { x: 5, y: 9, z: -2 },
  { x: -5, y: -9, z: 2 },
  { x: 13, y: 0, z: -11 },
  { x: -13, y: 0, z: 11 },
  { x: 0, y: 8, z: -12 },
  { x: 0, y: -8, z: 12 },
  { x: 14, y: 6, z: 0 }
];

function object(
  id: string,
  type: ArenaObjectSpec['type'],
  position: Vector3Like,
  scale: Vector3Like,
  rotation: Vector3Like = { x: 0, y: 0, z: 0 },
  bodyKind: ArenaObjectSpec['bodyKind'] = 'static',
  destructible = false
): ArenaObjectSpec {
  return {
    id,
    type,
    transform: {
      position,
      rotation,
      scale
    },
    bodyKind,
    destructible
  };
}

function createArenaObjects(): ArenaObjectSpec[] {
  return [
    object('reactor-core', 'reactor', { x: 0, y: 0, z: 0 }, { x: 8, y: 8, z: 8 }),
    object('upper-ring', 'platform', { x: 0, y: 6.5, z: 0 }, { x: 20, y: 1, z: 20 }),
    object('lower-ring', 'platform', { x: 0, y: -6.5, z: 0 }, { x: 20, y: 1, z: 20 }),
    object('north-tunnel', 'tunnel', { x: 0, y: 0, z: -13 }, { x: 9, y: 4, z: 4 }),
    object('south-tunnel', 'tunnel', { x: 0, y: 0, z: 13 }, { x: 9, y: 4, z: 4 }),
    object('east-bridge', 'platform', { x: 11, y: 3.5, z: 0 }, { x: 7, y: 0.8, z: 3 }),
    object('west-bridge', 'platform', { x: -11, y: -3.5, z: 0 }, { x: 7, y: 0.8, z: 3 }),
    object('crate-1', 'push-crate', { x: -9, y: 5, z: -9 }, { x: 1.6, y: 1.6, z: 1.6 }, { x: 0, y: 0.2, z: 0 }, 'dynamic'),
    object('crate-2', 'push-crate', { x: 9, y: 5, z: 9 }, { x: 1.6, y: 1.6, z: 1.6 }, { x: 0, y: 0.5, z: 0 }, 'dynamic'),
    object('crate-3', 'push-crate', { x: -9, y: -5, z: 9 }, { x: 1.6, y: 1.6, z: 1.6 }, { x: 0, y: 0.8, z: 0 }, 'dynamic'),
    object('crate-4', 'push-crate', { x: 9, y: -5, z: -9 }, { x: 1.6, y: 1.6, z: 1.6 }, { x: 0, y: 1.1, z: 0 }, 'dynamic'),
    object('crate-5', 'push-crate', { x: 0, y: 8, z: 11 }, { x: 1.6, y: 1.6, z: 1.6 }, { x: 0.2, y: 0.3, z: 0.2 }, 'dynamic'),
    object('crate-6', 'push-crate', { x: 0, y: -8, z: -11 }, { x: 1.6, y: 1.6, z: 1.6 }, { x: -0.2, y: -0.3, z: 0.1 }, 'dynamic'),
    object('drum-1', 'rolling-drum', { x: 13, y: 6, z: 4 }, { x: 1.7, y: 1.7, z: 1.7 }, { x: 0.4, y: 0.2, z: 0 }, 'dynamic'),
    object('drum-2', 'rolling-drum', { x: -13, y: -6, z: -4 }, { x: 1.7, y: 1.7, z: 1.7 }, { x: 0.3, y: 0.1, z: 0.1 }, 'dynamic'),
    object('drum-3', 'rolling-drum', { x: 12, y: -7, z: 10 }, { x: 1.7, y: 1.7, z: 1.7 }, { x: 0, y: 0.5, z: 0.2 }, 'dynamic'),
    object('drum-4', 'rolling-drum', { x: -12, y: 7, z: -10 }, { x: 1.7, y: 1.7, z: 1.7 }, { x: 0.2, y: 0.4, z: 0.3 }, 'dynamic'),
    object('pendulum-1', 'pendulum', { x: -4, y: 10, z: 0 }, { x: 0.9, y: 4.8, z: 0.9 }, { x: 0, y: 0, z: 0.4 }, 'kinematic'),
    object('pendulum-2', 'pendulum', { x: 4, y: 10, z: 0 }, { x: 0.9, y: 4.8, z: 0.9 }, { x: 0, y: 0, z: -0.4 }, 'kinematic'),
    object('barrier-1', 'barrier', { x: 0, y: 0, z: -7 }, { x: 4, y: 0.5, z: 0.8 }, { x: 0, y: 0.2, z: 0 }, 'dynamic', true),
    object('barrier-2', 'barrier', { x: 0, y: 0, z: 7 }, { x: 4, y: 0.5, z: 0.8 }, { x: 0, y: -0.2, z: 0 }, 'dynamic', true),
    object('barrier-3', 'barrier', { x: 0, y: 7, z: 0 }, { x: 4, y: 0.5, z: 0.8 }, { x: 0.2, y: 0.4, z: 1.57 }, 'dynamic', true)
  ];
}

export const ARENA_CONFIG: ArenaConfig = {
  bounds,
  maxSnakeLength: 20,
  initialSnakeLength: 8,
  respawnFrames: 180,
  snakeRadius: 0.52,
  snakeSegmentSpacing: 1.18,
  snakeSpawns: [
    { snakeId: PLAYER_ID, position: { x: -12, y: 0, z: 0 }, forward: { x: 1, y: 0, z: 0 } },
    { snakeId: AI_IDS[0], position: { x: 12, y: 0, z: 0 }, forward: { x: -1, y: 0, z: 0 } },
    { snakeId: AI_IDS[1], position: { x: 0, y: 8, z: 12 }, forward: { x: 0, y: -0.1, z: -1 } },
    { snakeId: AI_IDS[2], position: { x: 0, y: -8, z: -12 }, forward: { x: 0, y: 0.1, z: 1 } }
  ],
  pickupSpawnPoints,
  arenaObjects: createArenaObjects()
};
