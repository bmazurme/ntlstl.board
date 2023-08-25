/* eslint-disable max-len */
import { convertJouleToCalories, getQMidOrMax } from '../utils';

export default function getThermoFlows(qht: number, qhhr: number, th: number, tc: number, qht2: number) {
  const qmid = getQMidOrMax(qht, th, tc, qht2);
  const qmax = getQMidOrMax(qhhr, th, tc, qht2);
  const qmidg = convertJouleToCalories(qmid);
  const qmaxg = convertJouleToCalories(qmax);

  return {
    qmid, qmax, qmidg, qmaxg,
  };
}
