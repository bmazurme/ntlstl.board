export default function getFlow(
  zMid: number,
  a: number,
  areaSumm: number,
  timeSumm: number,
  n: number,
) {
  return (zMid * (a ** 1.2) * areaSumm) / (timeSumm ** (1.2 * n - 0.1));
}
