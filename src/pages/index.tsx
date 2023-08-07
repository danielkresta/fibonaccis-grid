import Head from "next/head";
import { Inter } from "next/font/google";
import { useState } from "react";

import styles from "@/styles/Home.module.css";

import { generateGrid } from "../implementation/grid-generator";
import GridCell from "./cell";
import { COLOR_TIMEOUT_MS, GRID_SIZE } from "../implementation/config";
import { checkGridForSequence } from "../implementation/grid-checker";
import { Cell, CellColor } from "../implementation/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [grid, setGrid] = useState(
    generateGrid<Cell>(GRID_SIZE.width, GRID_SIZE.height, {
      value: 0,
      color: CellColor.White,
    })
  );

  function handleCellClick(rowIndex: number, columIndex: number) {
    incrementRowAndColumn(grid, rowIndex, columIndex);
    checkGridForSequence(grid);

    resetColorsAfter(COLOR_TIMEOUT_MS);

    // TIL React also does not like mutation
    setGrid([...grid.map((row) => row.map((cell) => ({ ...cell })))]);
  }

  function incrementRowAndColumn(
    grid: Cell[][],
    rowIndex: number,
    columIndex: number
  ): void {
    for (let i = 0; i < GRID_SIZE.height; i++) {
      const row = grid[i];
      if (row === undefined) continue;
      const targetCell = row[columIndex];
      if (targetCell == undefined) continue;
      row[columIndex] = {
        value: targetCell.value + 1,
        color: CellColor.Yellow,
      };
    }

    for (let j = 0; j < GRID_SIZE.width; j++) {
      const column = grid[rowIndex];
      if (column === undefined) continue;
      const targetCell = column[j];
      const isCentralCell = j === columIndex;
      if (isCentralCell || targetCell == undefined) continue;
      column[j] = {
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
        <title>Fibonacci&lsquo;s grid</title>
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
