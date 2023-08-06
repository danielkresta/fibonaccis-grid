export function generateGrid<T>(
  width: number,
  height: number,
  initialValue: T
): T[][] {
  return Array.from(Array(height), () =>
    Array.from(Array(width).fill(initialValue))
  );
}
