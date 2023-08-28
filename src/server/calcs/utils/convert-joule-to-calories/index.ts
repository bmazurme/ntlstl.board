const CALORIES_KOEF = 0.0008598;

export default function convertJouleToCalories(flow: number) {
  return flow * CALORIES_KOEF;
}
