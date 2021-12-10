// ポケモンのレベル
export const DEFAULT_LEVEL = 50;
export const MAX_LEVEL = 100;
export const MIN_LEVEL = 1;

export const RANKS = [
  { id: 1, magnification: 6, percent: 400 },
  { id: 2, magnification: 5, percent: 350 },
  { id: 3, magnification: 4, percent: 300 },
  { id: 4, magnification: 3, percent: 250 },
  { id: 5, magnification: 2, percent: 200 },
  { id: 6, magnification: 1, percent: 150 },
  { id: 7, magnification: 0, percent: 100 },
  { id: 8, magnification: -1, percent: 67 },
  { id: 9, magnification: -2, percent: 50 },
  { id: 10, magnification: -3, percent: 40 },
  { id: 11, magnification: -4, percent: 33 },
  { id: 12, magnification: -5, percent: 29 },
  { id: 13, magnification: -6, percent: 25 },
];

export const SPEED_ITEMS = [
  { id: 1, name: "スピードパウダー (×2)", value: 20 },
  { id: 2, name: "こだわりスカーフ (×1.5)", value: 15 },
  { id: 3, name: "--- 道具を選択 ---", value: 10 },
  { id: 4, name: "くろいてっきゅう (×0.5)", value: 5 },
];

export const SPEED_ABILITIES = [
  { id: 1, name: "すいすい・ようりょくそ (×2)", value: 20 },
  { id: 2, name: "はやあし・かるわざ (×2)", value: 2 },
  { id: 3, name: "--- 特性を選択 ---", value: 10 },
  { id: 4, name: "スロースタート (×0.5)", value: 5 },
];
