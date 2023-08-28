/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
import { getQ5, getSummRoofArea } from '../utils';

export default function getRainFlowFromRoof(areaRoof: number, areaFacade: number, n: number, q20: number, slope: number) {
  const sumRoofArea = getSummRoofArea(areaRoof, areaFacade);

  if (slope < 1.5) {
    return {
      flow: sumRoofArea * q20 / 10000,
      sumRoofArea,
    };
  }
  const q5 = getQ5(n, q20);
  return {
    flow: sumRoofArea * q5 / 10000,
    sumRoofArea,
    q5,
  };
}
