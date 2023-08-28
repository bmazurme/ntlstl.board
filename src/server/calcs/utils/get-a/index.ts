/**
 * параметры, характеризующие расчетную интенсивность дождя для конкретной местности
 */
export default function getA(intensity: number, n: number, pa: number, gamma: number) {
  return intensity * 20 ** n * pa ** gamma;
}
