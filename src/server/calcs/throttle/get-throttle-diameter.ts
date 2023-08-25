export default function getThrottleDiameter(q: number, hdr: number) {
  return 3.16 * ((3.6 * q) ** 2 / hdr) ** 0.25;
}
