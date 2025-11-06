import {useEffect, useState, useCallback } from 'react';
import {
  createEmptyBoard,
  addRandomTile,
  move,
  hasMoves,
  hasWon,
} from '../utils/board';

export function useGameState(initialSize = 4) {
  const [size, setSize] = useState(initialSize);
  const [board, setBoard] = useState(() => addRandomTile(addRandomTile(createEmptyBoard(initialSize))));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('best2048') || '0', 10));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [prevMoves, setPrevMoves] = useState([]);

  const init = useCallback((s = size) => {
    const empty = createEmptyBoard(s);
    const withOne = addRandomTile(empty);
    const withTwo = addRandomTile(withOne);
    setBoard(withTwo);
    setPrevMoves([withTwo]);
    setScore(0);
    setGameOver(false);
    setWon(false);
  }, [size]);

  // ensure board re-initializes when size changes
  useEffect(() => init(size), [size, init]);

  const handleMove = useCallback((direction) => {
    if (gameOver || won) return;
    const { board: newBoard, gained, moved } = move(board, direction);
    if (!moved) return;

    const withNewTile = addRandomTile(newBoard);
    setBoard(withNewTile);

    setScore((s) => {
      const ns = s + gained;
      if (ns > best) {
        setBest(ns);
        localStorage.setItem('best2048', String(ns));
      }
      return ns;
    });
    
    setPrevMoves([...prevMoves, withNewTile]);

    if (hasWon(withNewTile)) setWon(true);
    else if (!hasMoves(withNewTile)) setGameOver(true);
  }, [board, gameOver, won, best]);

  const undoAction = useCallback(() => {
    console.log(prevMoves);
    const newHistory = prevMoves.slice(0, Math.max(1, prevMoves.length - 1));
    setBoard(newHistory[newHistory.length - 1]);
    setPrevMoves(newHistory);

    console.log(newHistory);
  }, [prevMoves]);

  return {
    size, board, score, best, gameOver, won,
    setSize, init, handleMove, undoAction
  }
}