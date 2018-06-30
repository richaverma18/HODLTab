export function formatToUnits(number) {
  const abbrev = ['', 'K', 'M', 'B', 'T'];
  const order = Math.min(Math.floor(Math.log10(Math.abs(number)) / 3), abbrev.length - 1);
  const suffix = abbrev[order];
  return (number / Math.pow(10, order * 3)).toFixed(2) + suffix;
}
