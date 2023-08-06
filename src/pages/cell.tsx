import styles from "@/styles/Home.module.css";
import { MouseEventHandler, useEffect, useState } from "react";

export interface GridProps {
  value: number;
  color?: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function GridCell({ value, color, onClick }: GridProps) {
  return (
    <div
      className={`${styles["grid-cell"]}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {!!value && value}
    </div>
  );
}
