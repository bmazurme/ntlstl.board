import { KOEF } from '../../data';

import { TypeRainArea } from '../get-area-summ';
/**
 * среднее значение коэффициента покрова, характеризующего поверхность бассейна стока
 */
export default function getZMid(area: TypeRainArea, areaSumm: number, z: number) {
  const {
    roof = 0, pavements = 0, tracks = 0, ground = 0, cobblestone = 0, stone = 0, lawns = 0,
  } = area;
  const {
    PAVEMENTS, TRACKS, GROUND, COBBLESTONE, STONE, LAWNS,
  } = KOEF;

  return (roof * z + pavements * PAVEMENTS + tracks * TRACKS + ground * GROUND
    + cobblestone * COBBLESTONE + stone * STONE + lawns * LAWNS) / areaSumm;
}
