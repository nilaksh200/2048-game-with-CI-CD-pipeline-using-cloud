export const GRID_SIZE = 4;

export type Board = number[][];

export type Direction = "left" | "right" | "up" | "down";

export function createEmptyBoard(): Board {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

export function getEmptyCells(board: Board): { row: number; col: number }[] {
  const empty: { row: number; col: number }[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === 0) empty.push({ row, col });
    }
  }
  return empty;
}

export function spawnTile(board: Board): Board {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;
  const newBoard = board.map(row => [...row]);
  const { row, col } = empty[Math.floor(Math.random() * empty.length)];
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}

function slideRow(row: number[]): { row: number[]; score: number } {
  let tiles = row.filter(v => v !== 0);
  let score = 0;
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] === tiles[i + 1]) {
      tiles[i] *= 2;
      score += tiles[i];
      tiles.splice(i + 1, 1);
    }
  }
  while (tiles.length < GRID_SIZE) tiles.push(0);
  return { row: tiles, score };
}

function rotateClockwise(board: Board): Board {
  return board[0].map((_, col) => board.map(row => row[col]).reverse());
}

function rotateCounterClockwise(board: Board): Board {
  return board[0].map((_, col) => board.map(row => row[GRID_SIZE - 1 - col]));
}

export function move(board: Board, direction: Direction): { board: Board; score: number } {
  let rotated = board;
  if (direction === "right") rotated = rotated.map(row => [...row].reverse());
  if (direction === "up") rotated = rotateCounterClockwise(board);
  if (direction === "down") rotated = rotateClockwise(board);

  let totalScore = 0;
  const moved = rotated.map(row => {
    const { row: newRow, score } = slideRow(row);
    totalScore += score;
    return newRow;
  });

  let result = moved;
  if (direction === "right") result = moved.map(row => [...row].reverse());
  if (direction === "up") result = rotateClockwise(moved);
  if (direction === "down") result = rotateCounterClockwise(moved);

  return { board: result, score: totalScore };
}

export function boardChanged(a: Board, b: Board): boolean {
  return a.some((row, r) => row.some((val, c) => val !== b[r][c]));
}

export function hasWon(board: Board): boolean {
  return board.some(row => row.some(val => val === 2048));
}

export function isGameOver(board: Board): boolean {
  if (getEmptyCells(board).length > 0) return false;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (c < GRID_SIZE - 1 && board[r][c] === board[r][c + 1]) return false;
      if (r < GRID_SIZE - 1 && board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
}