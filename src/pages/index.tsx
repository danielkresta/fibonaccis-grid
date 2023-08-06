import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { generateGrid } from "./grid-generator";
import GridCell from "./cell";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

enum CellColor {
  White = "#ffffff",
  Yellow = "#fafa33",
  Green = "#50c878",
}

interface Cell {
  value: number;
  color: string;
}

const gridSize = {
  width: 50,
  height: 50,
};

const colorTimeoutMs = 10;

export default function Home() {
  const [grid, setGrid] = useState(
    generateGrid<Cell>(gridSize.width, gridSize.height, {
      value: 0,
      color: CellColor.White,
    })
  );

  function handleCellClick(rowIndex: number, columIndex: number) {
    incrementRowAndColumn(grid, rowIndex, columIndex);

    resetColorsAfter(colorTimeoutMs);

    // TIL React also does not like mutation
    setGrid([...grid.map((row) => row.map((cell) => ({ ...cell })))]);
  }

  function incrementRowAndColumn(
    grid: Cell[][],
    rowIndex: number,
    columIndex: number
  ): void {
    for (let i = 0; i < gridSize.height; i++) {
      const targetCell = grid[i][columIndex];
      grid[i][columIndex] = {
        value: targetCell.value + 1,
        color: CellColor.Yellow,
      };
    }
    for (let j = 0; j < gridSize.width; j++) {
      const targetCell = grid[rowIndex][j];
      const isCentralCell = j === columIndex;
      if (isCentralCell) continue;
      grid[rowIndex][j] = {
        value: targetCell.value + 1,
        color: CellColor.Yellow,
      };
    }
  }

  function resetColorsAfter(timeOut: number) {
    setTimeout(() => {
      grid.forEach((row) =>
        row.forEach((cell) => (cell.color = CellColor.White))
      );
      setGrid(grid);
    }, timeOut);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Fibonacci's grid" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {grid.map((row, i) => (
          <div key={i} className={`${styles["grid-row"]}`}>
            {row.map((cell, j) => (
              <GridCell
                key={j}
                value={cell.value}
                color={cell.color}
                onClick={() => handleCellClick(i, j)}
              />
            ))}
          </div>
        ))}
      </main>
    </>
  );
}
