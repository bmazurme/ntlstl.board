export default function getZ(a: number, n: number) {
  let z = 0.32;

  if (a < 300) {
    z = n < 0.65 ? 0.32 : 0.33;
  } else if (a < 400) {
    z = n < 0.65 ? 0.30 : 0.31;
  } else if (a < 500) {
    z = n < 0.65 ? 0.29 : 0.30;
  } else if (a < 600) {
    z = n < 0.65 ? 0.28 : 0.29;
  } else if (a < 700) {
    z = n < 0.65 ? 0.27 : 0.28;
  } else if (a < 800) {
    z = n < 0.65 ? 0.26 : 0.27;
  } else if (a < 1000) {
    z = n < 0.65 ? 0.25 : 0.26;
  } else if (a < 1200) {
    z = n < 0.65 ? 0.24 : 0.25;
  } else if (a < 1500) {
    z = n < 0.65 ? 0.23 : 0.24;
  }

  return z;
}
