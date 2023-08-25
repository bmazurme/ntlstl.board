// roof - Кровля зданий и сооружений, асфальтобетонные покрытия дорог
// pavements - Брусчатые мостовые и черные щебеночные покрытия дорог
// tracks - Гравийные садово-парковые дорожки
// ground - Грунтовые поверхности(спланированные)
// cobblestone - Булыжные мостовые
// stone - Щебеночные покрытия, не обработанные вяжущими
// lawns - Газоны

const KOEF: Record<string, number> = {
  PAVEMENTS: 0.22,
  COBBLESTONE: 0.14,
  STONE: 0.13,
  TRACKS: 0.09,
  GROUND: 0.06,
  LAWNS: 0.04,
};

export default KOEF;
