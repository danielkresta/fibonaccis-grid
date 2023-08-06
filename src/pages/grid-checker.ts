import { GRID_SIZE, SEARCHED_SEQUENCE_LENGTH } from "./config";
import { generateFibonacci } from "./fibonacci";
import { Cell, CellColor } from "./types";

enum SearchDirection {
  Right = "right",
  Left = "left",
  Up = "up",
  Down = "down",
}

const fibonacciSequence = generateFibonacci(10);

export function checkGridForSequence(grid: Cell[][]) {
  for (let rowIndex = 0; rowIndex < GRID_SIZE.height; rowIndex++) {
    const row = grid[rowIndex];
    if (row === undefined) continue;

    for (let colIndex = 0; colIndex < GRID_SIZE.width; colIndex++) {
      const startingCell = row[colIndex];
      const sequenceStartIndex = fibonacciSequence.findIndex(
        (value) => value === startingCell?.value
      );
      if (sequenceStartIndex === -1 || startingCell === undefined) continue;

      Object.values(SearchDirection).forEach((direction) => {
        checkForSequenceInDirection(
          direction,
          grid,
          sequenceStartIndex,
          startingCell,
          rowIndex,
          colIndex
        );
      });
    }
  }
}

function checkForSequenceInDirection(
  direction: SearchDirection,
  grid: Cell[][],
  sequenceStartIndex: number,
  startingCell: Cell,
  rowIndex: number,
  colIndex: number
): void {
  const sequence = [startingCell];

  for (let k = 1; k < SEARCHED_SEQUENCE_LENGTH; k++) {
    const nextFibonacciNumber = fibonacciSequence[sequenceStartIndex + k];
    const nextCell = getCellInDirection(grid, direction, rowIndex, colIndex, k);
    if (nextCell !== undefined && nextCell.value === nextFibonacciNumber) {
      sequence.push(nextCell);
    } else {
      break;
    }
  }

  if (sequence.length === SEARCHED_SEQUENCE_LENGTH) {
    for (const cell of sequence) {
      cell!.color = CellColor.Green;
      cell!.value = 0;
    }
  }
}

function getCellInDirection(
  grid: Cell[][],
  direction: SearchDirection,
  rowIndex: number,
  colIndex: number,
  distance: number
): Cell | undefined {
  switch (direction) {
    case SearchDirection.Right:
      return grid[rowIndex]?.[colIndex + distance];
    case SearchDirection.Left:
      return grid[rowIndex]?.[colIndex - distance];
    case SearchDirection.Up:
      return grid[rowIndex - distance]?.[colIndex];
    case SearchDirection.Down:
      return grid[rowIndex + distance]?.[colIndex];
  }
}
