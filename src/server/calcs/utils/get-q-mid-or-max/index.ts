const KOEF = 1.16;

export default function getQMidOrMax(qhtOrHr: number, th: number, tc: number, qht2: number) {
  return KOEF * qhtOrHr * (th - tc) + qht2;
}
