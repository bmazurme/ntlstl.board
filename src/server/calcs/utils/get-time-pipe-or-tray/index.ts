/**
 * расчетная продолжительность протекания дождевых вод по трубам или лоткам до расчетного участка
 */
export default function getTimePipeOrTray(type: 'pipe' | 'tray', length: number, velocity: number) {
  const koef = type === 'pipe' ? 0.017 : 0.021;

  return koef * (length / velocity);
}
