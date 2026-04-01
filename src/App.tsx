import { useState, useEffect, useCallback, useRef } from "react";
import {
  createEmptyBoard, spawnTile, move,
  boardChanged, hasWon, isGameOver,
} from "./gameLogic";
import type { Direction } from "./gameLogic";
import { getPhase } from "./phases";
import Background from "./components/Background";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

function initBoard() {
  let board = createEmptyBoard();
  board = spawnTile(board);
  board = spawnTile(board);
  return board;
}

function getDirection(dx: number, dy: number): Direction | null {
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  if (Math.max(absDx, absDy) < 20) return null;
  return absDx > absDy ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
}

const btnStyle: React.CSSProperties = {
  marginTop: "16px",
  fontFamily: "'Press Start 2P', monospace",
  fontSize: "10px",
  background: "#c07840",
  color: "#fdf6ec",
  border: "3px solid #8a5020",
  padding: "10px 20px",
  boxShadow: "4px 4px 0px #7a4010",
  cursor: "pointer",
  letterSpacing: "1px",
};

export default function App() {
  const [board, setBoard] = useState(initBoard);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem("bestScore")) || 0);
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);
  const [ghost, setGhost] = useState<{ value: number; x: number; y: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const phase = getPhase(score);

  const handleMove = useCallback((direction: Direction) => {
    if (won || over) return;
    const { board: newBoard, score: gained } = move(board, direction);
    if (!boardChanged(board, newBoard)) return;
    const updated = score + gained;
    setScore(updated);
    if (updated > bestScore) {
      setBestScore(updated);
      localStorage.setItem("bestScore", String(updated));
    }
    const spawned = spawnTile(newBoard);
    setBoard(spawned);
    if (hasWon(spawned)) setWon(true);
    else if (isGameOver(spawned)) setOver(true);
  }, [board, score, bestScore, won, over]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowLeft: "left", ArrowRight: "right",
        ArrowUp: "up", ArrowDown: "down",
      };
      const d = map[e.key];
      if (d) { e.preventDefault(); handleMove(d); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove]);

  function getTileValue(e: React.MouseEvent) {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const val = el?.closest("[data-tile-value]")?.getAttribute("data-tile-value");
    return val ? Number(val) : 0;
  }

  function handleMouseDown(e: React.MouseEvent) {
    dragStart.current = { x: e.clientX, y: e.clientY };
    const value = getTileValue(e);
    if (value !== 0) setGhost({ value, x: e.clientX, y: e.clientY });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragStart.current || !ghost) return;
    setGhost(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  }

  function handleMouseUp(e: React.MouseEvent) {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragStart.current = null;
    setGhost(null);
    const d = getDirection(dx, dy);
    if (d) handleMove(d);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    const d = getDirection(dx, dy);
    if (d) handleMove(d);
  }

  function restart() {
    setBoard(initBoard());
    setScore(0);
    setWon(false);
    setOver(false);
    setGhost(null);
  }

  const overlayStyle: React.CSSProperties = {
    position: "absolute", inset: 0, zIndex: 20,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    borderRadius: "0px",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>

      <Background phase={phase} />

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "28px", color: "#7a3020", letterSpacing: "4px", marginBottom: "4px", textShadow: "3px 3px 0px #f0b870" }}>
          2048
        </h1>
        <p style={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: "#8a5030", marginBottom: "4px", letterSpacing: "2px" }}>
          JOIN THE TILES!plsplspls!!
        </p>

        <ScoreBoard score={score} bestScore={bestScore} phaseName={phase.name} phaseColor={phase.labelColor} />

        <div
          style={{ position: "relative", cursor: ghost ? "grabbing" : "grab", userSelect: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => { setGhost(null); dragStart.current = null; }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onDragStart={e => e.preventDefault()}
        >
          <GameBoard board={board} />

          {won && (
            <div style={{ ...overlayStyle, background: "rgba(237,194,46,0.88)" }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "16px", color: "#fff", marginBottom: "8px" }}>YOU WON!</div>
              <button style={btnStyle} onClick={restart}>PLAY AGAIN</button>
            </div>
          )}
          {over && (
            <div style={{ ...overlayStyle, background: "rgba(238,228,218,0.88)" }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "16px", color: "#776e65", marginBottom: "8px" }}>GAME OVER</div>
              <button style={btnStyle} onClick={restart}>TRY AGAIN</button>
            </div>
          )}
        </div>

        <button style={btnStyle} onClick={restart}>NEW GAME</button>
      </div>

      {/* Ghost tile */}
      {ghost && (
        <div style={{
          position: "fixed",
          left: ghost.x - 40, top: ghost.y - 40,
          width: "80px", height: "80px",
          background: ({ 0: "#cdc1b4", 2: "#eee4da", 4: "#ede0c8", 8: "#f2b179", 16: "#f59563", 32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72", 256: "#edcc61", 512: "#edc850", 1024: "#edc53f", 2048: "#edc22e" } as Record<number, string>)[ghost.value] ?? "#3c3a32",
          color: ghost.value <= 4 ? "#776e65" : "#f9f6f2",
          fontSize: ghost.value >= 1024 ? "10px" : "14px",
          fontFamily: "'Press Start 2P', monospace",
          fontWeight: "bold",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0.85,
          pointerEvents: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          transform: "scale(1.1)",
          zIndex: 9999,
        }}>
          {ghost.value !== 0 ? ghost.value : ""}
        </div>
      )}
    </div>
  );
}