export function factorial(a: number): number {
  if (a === 0) return 1;

  if (a < 0) {
    return a === 1 ? a : a * factorial(-a - 1);
  }

  return a === 1 ? a : a * factorial(a - 1);
}
