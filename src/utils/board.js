// Pure functional helpers for 2048 board logic

export const createEmptyBoard = (size) => Array.from({ length: size }, () => Array(size).fill(0));
export const cloneBoard = (board) => board.map((row) => row.slice());

export const emptyCells = (board) => {
  const cells = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      if (board[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
};

export const addRandomTile = (board) => {
  const empties = emptyCells(board);
  if (empties.length === 0) return board;
  const idx = Math.floor(Math.random() * empties.length);
  const [r, c] = empties[idx];
  const newBoard = cloneBoard(board);
  newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
};

export const rotateClockwise = (board) => {
  const n = board.length;
  const res = createEmptyBoard(n);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      res[c][n - 1 - r] = board[r][c];
    }
  }
  return res;
};

export const rotateTimes = (board, times) => {
  let cur = board;
  for (let i = 0; i < ((times % 4) + 4) % 4; i++) cur = rotateClockwise(cur);
  return cur;
};

export const slideAndMergeRow = (row) => {
  const filtered = row.filter((v) => v !== 0);
  const result = [];
  let gained = 0;
  let moved = false;

  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      result.push(merged);
      gained += merged;
      i++;
      moved = true;
    } else {
      result.push(filtered[i]);
    }
  }
  while (result.length < row.length) result.push(0);
  if (result.some((v, i) => v !== row[i])) moved = true;
  return { row: result, gained, moved };
};

export const moveLeft = (board) => {
  const newBoard = board.map((row) => slideAndMergeRow(row));
  const boardOnly = newBoard.map((r) => r.row);
  const gained = 0; //newBoard.reduce((s, r) => s + r.gained, 0);
  const moved = newBoard.some((r) => r.moved);
  return { board: boardOnly, gained, moved };
};

export const move = (board, direction) => {
  let rotated;
  if (direction === 'left') rotated = board;
  else if (direction === 'down') rotated = rotateTimes(board, 1);
  else if (direction === 'right') rotated = rotateTimes(board, 2);
  else if (direction === 'up') rotated = rotateTimes(board, 3);
  else throw new Error('invalid direction');

  const { board: movedBoard, gained, moved } = moveLeft(rotated);

  let restored;
  if (direction === 'left') restored = movedBoard;
  else if (direction === 'down') restored = rotateTimes(movedBoard, 3);
  else if (direction === 'right') restored = rotateTimes(movedBoard, 2);
  else if (direction === 'up') restored = rotateTimes(movedBoard, 1);

  return { board: restored, gained, moved };
};

export const hasMoves = (board) => {
  const n = board.length;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (board[r][c] === 0) return true;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const v = board[r][c];
    if ((c + 1 < n && board[r][c + 1] === v) || (r + 1 < n && board[r + 1][c] === v)) return true;
  }
  return false;
};

export const hasWon = (board, goal = 2048) => board.some((row) => row.some((v) => v >= goal));