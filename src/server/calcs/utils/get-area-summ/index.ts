export type TypeRainArea = {
  roof: number;
  stone: number;
  lawns: number;
  tracks: number;
  ground: number;
  pavements: number;
  cobblestone: number;
}
/**
 * расчетная площадь стока, га
 */
export default function getAreaSumm(area: TypeRainArea) {
  const {
    roof = 0, pavements = 0, tracks = 0, ground = 0, cobblestone = 0, stone = 0, lawns = 0,
  } = area;

  return roof + pavements + tracks + ground + cobblestone + stone + lawns;
}
