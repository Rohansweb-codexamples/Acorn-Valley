import { ASSETS } from './assets.js';

// Isometric tile dimensions
export const TILE_W = 80;
export const TILE_H = 40;
export const GRID_SIZE = 14;

// Convert grid coordinates to screen position
export function tileToScreen(col, row) {
  return {
    x: (col - row) * (TILE_W / 2),
    y: (col + row) * (TILE_H / 2),
  };
}

// Tile types: G=grass, W=water, P=path(road), B=bridge
export const TILE_MAP = [
  ['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
  ['G','G','G','P','P','P','P','P','G','G','G','G','G','G'],
  ['G','G','G','P','G','G','G','P','G','G','G','G','G','G'],
  ['G','W','W','W','G','G','G','P','G','G','G','G','G','G'],
  ['G','G','W','W','W','G','G','P','P','G','G','G','G','G'],
  ['G','G','G','W','W','W','G','G','P','G','G','G','G','G'],
  ['G','G','G','G','W','W','W','G','P','P','G','G','G','G'],
  ['G','G','G','G','G','W','W','G','G','P','G','G','G','G'],
  ['G','G','G','P','P','B','W','W','G','P','G','G','G','G'],
  ['G','G','G','P','G','G','G','W','W','P','P','G','G','G'],
  ['G','G','G','P','G','G','G','G','W','W','G','G','G','G'],
  ['G','G','G','P','P','G','G','G','G','W','G','G','G','G'],
  ['G','G','G','G','P','P','G','G','G','W','W','G','G','G'],
  ['G','G','G','G','G','P','P','P','G','G','W','G','G','G'],
];

export const TILE_COLORS = {
  G: { top: '#8BC34A', bottom: '#7CB342', edge: '#558B2F' },
  W: { top: '#42A5F5', bottom: '#1E88E5', edge: '#1565C0' },
  P: { top: '#BDBDBD', bottom: '#9E9E9E', edge: '#757575' },
  B: { top: '#A1887F', bottom: '#8D6E63', edge: '#5D4037' },
};

export const BUILDING_TYPES = {
  bakery: {
    name: 'Acorn Bakery',
    image: ASSETS.bakery,
    cost: 100,
    productionRate: 20,
    productionAmount: 25,
    xp: 15,
    description: 'Bakes delicious acorn treats!',
  },
  windmill: {
    name: 'Golden Mill',
    image: ASSETS.windmill,
    cost: 150,
    productionRate: 30,
    productionAmount: 35,
    xp: 20,
    description: 'Grinds golden acorn flour.',
  },
  cottage: {
    name: 'Sheep Cottage',
    image: ASSETS.cottage,
    cost: 200,
    productionRate: 40,
    productionAmount: 20,
    xp: 25,
    description: 'Home to happy fluffy sheep.',
  },
};

export const INITIAL_BUILDINGS = [
  { id: 'b1', type: 'bakery', col: 2, row: 1, lastProduced: Date.now() - 22000, ready: false },
  { id: 'b2', type: 'windmill', col: 11, row: 0, lastProduced: Date.now() - 12000, ready: false },
  { id: 'b3', type: 'cottage', col: 2, row: 8, lastProduced: Date.now() - 42000, ready: false },
];

export const INITIAL_CHARACTERS = [
  { id: 'c1', type: 'sheep', col: 4, row: 6, image: ASSETS.sheep, size: 70 },
  { id: 'c2', type: 'rabbit', col: 6, row: 1, image: ASSETS.rabbit, size: 65 },
  { id: 'c3', type: 'acorn', col: 10, row: 12, image: ASSETS.acorn, size: 55 },
];

export const INITIAL_QUESTS = [
  {
    id: 'q1',
    character: ASSETS.acorn,
    characterName: 'Pip',
    title: "Pip's request",
    task: 'Build an Acorn Bakery',
    status: 'ready',
    reward: { acorns: 50, stars: 5 },
    claimed: false,
  },
  {
    id: 'q2',
    character: ASSETS.rabbit,
    characterName: 'Clover',
    title: "Clover's request",
    task: 'Collect from 3 buildings',
    status: 'active',
    progress: 0,
    target: 3,
    reward: { acorns: 80, stars: 3 },
    claimed: false,
  },
];
