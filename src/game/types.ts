export interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

export interface QuaternionLike {
  x: number;
  y: number;
  z: number;
  w: number;
}

export type CameraMode = 'tactical' | 'chase';
export type GameStatus = 'running' | 'paused' | 'game-over';

export interface SnakeSegment {
  id: string;
  position: Vector3Like;
  radius: number;
  role: 'head' | 'body' | 'tail';
}

export interface SnakeEntity {
  id: string;
  name: string;
  color: string;
  isPlayer: boolean;
  alive: boolean;
  attacking: boolean;
  queuedGrowth: number;
  segments: SnakeSegment[];
  rigidBodies: string[];
  velocity: Vector3Like;
  forward: Vector3Like;
  respawnTimer: number;
}

export type ArenaObjectType =
  | 'reactor'
  | 'platform'
  | 'tunnel'
  | 'push-crate'
  | 'rolling-drum'
  | 'pendulum'
  | 'barrier'
  | 'wall';

export interface ArenaTransform {
  position: Vector3Like;
  rotation: Vector3Like;
  scale: Vector3Like;
}

export interface ArenaObjectSpec {
  id: string;
  type: ArenaObjectType;
  transform: ArenaTransform;
  bodyKind: 'static' | 'dynamic' | 'kinematic';
  destructible: boolean;
}

export interface Pickup {
  id: string;
  position: Vector3Like;
  active: boolean;
}

export interface CombatEvent {
  attackerId: string;
  victimId: string;
  kind: 'boost-hit' | 'head-to-head';
}

export interface PlayerInputState {
  thrust: number;
  yaw: number;
  lift: number;
  boosting: boolean;
}

export interface SnakeSpawn {
  snakeId: string;
  position: Vector3Like;
  forward: Vector3Like;
}

export interface ArenaConfig {
  bounds: {
    min: Vector3Like;
    max: Vector3Like;
  };
  maxSnakeLength: number;
  initialSnakeLength: number;
  respawnFrames: number;
  snakeRadius: number;
  snakeSegmentSpacing: number;
  snakeSpawns: SnakeSpawn[];
  pickupSpawnPoints: Vector3Like[];
  arenaObjects: ArenaObjectSpec[];
}

export interface GameState {
  snakes: SnakeEntity[];
  arenaObjects: ArenaObjectSpec[];
  pickups: Pickup[];
  cameraMode: CameraMode;
  score: number;
  status: GameStatus;
  message: string;
  tick: number;
  seed: number;
}

export interface AITarget {
  kind: 'pickup' | 'enemy' | 'center';
  id: string;
  position: Vector3Like;
  score: number;
  distance: number;
}

export interface RenderSegment {
  position: Vector3Like;
  rotation: QuaternionLike;
}

export interface RenderSnake {
  id: string;
  color: string;
  alive: boolean;
  attacking: boolean;
  segments: RenderSegment[];
}

export interface RenderObject {
  id: string;
  type: ArenaObjectType;
  position: Vector3Like;
  rotation: QuaternionLike;
  hidden: boolean;
}

export interface RenderPickup {
  id: string;
  position: Vector3Like;
  active: boolean;
}

export interface RenderSnapshot {
  cameraMode: CameraMode;
  status: GameStatus;
  score: number;
  message: string;
  snakes: RenderSnake[];
  pickups: RenderPickup[];
  objects: RenderObject[];
  cameraTarget: {
    position: Vector3Like;
    forward: Vector3Like;
  };
}
