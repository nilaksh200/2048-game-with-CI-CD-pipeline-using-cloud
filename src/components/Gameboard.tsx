import Tile from "./Tile";
import type { Board } from "../gameLogic";

type Props = { board: Board };

export default function GameBoard({ board }: Props) {
  return (
    <div style={{
      background: "#bbada0",
      border: "4px solid #8f7a66",
      boxShadow: "6px 6px 0px #6a5040",
      padding: "10px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 80px)",
      gridTemplateRows: "repeat(4, 80px)",
      gap: "8px",
    }}>
      {board.map((row, r) =>
        row.map((val, c) => <Tile key={`${r}-${c}`} value={val} />)
      )}
    </div>
  );
}