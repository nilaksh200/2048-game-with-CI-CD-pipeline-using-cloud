type TileProps = { value: number };

const tileColors: Record<number, string> = {
  0: "#cdc1b4", 2: "#eee4da", 4: "#ede0c8",
  8: "#f2b179", 16: "#f59563", 32: "#f67c5f",
  64: "#f65e3b", 128: "#edcf72", 256: "#edcc61",
  512: "#edc850", 1024: "#edc53f", 2048: "#edc22e",
};

export default function Tile({ value }: TileProps) {
  const bg = tileColors[value] ?? "#3c3a32";
  const color = value <= 4 ? "#776e65" : "#f9f6f2";
  const fontSize = value >= 1024 ? "10px" : value >= 128 ? "12px" : value >= 64 ? "14px" : "18px";

  return (
    <div data-tile-value={value} style={{
      width: "80px", height: "80px",
      background: bg, color,
      fontSize, fontWeight: "bold",
      fontFamily: "'Press Start 2P', monospace",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "3px solid transparent",
      borderColor: value === 0 ? "#b8a898" : "transparent",
    }}>
      {value !== 0 ? value : ""}
    </div>
  );
}