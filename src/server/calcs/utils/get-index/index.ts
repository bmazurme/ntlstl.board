export default function getIndex(intensity: number) {
  let index = intensity >= 60 && intensity < 80 ? 1 : 0;

  if (intensity >= 80 && intensity < 120) {
    index = 2;
  } else if (intensity >= 120) {
    index = 3;
  }

  return index;
}
