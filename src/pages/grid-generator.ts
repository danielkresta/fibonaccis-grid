export function generateGrid<T>(
  width: number,
  height: number,
  initialValue: T
): T[][] {
  return Array.from(Array(width), () =>
    Array.from(Array(height).fill(initialValue))
  );
}
