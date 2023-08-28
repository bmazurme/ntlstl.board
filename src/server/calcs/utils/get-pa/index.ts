export default function getPa(p: number, mr: number) {
  return 1 + Math.log10(p) / Math.log10(mr);
}
