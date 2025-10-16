import React, { useCallback, useEffect, useState } from 'react';
import {
  createEmptyBoard,
  addRandomTile,
  move,
  hasMoves,
  hasWon,
} from '../utils/board';
import Header from './Header';
import Controls from './Controls';
import BoardGrid from './BoardGrid';
import { useKeyControls } from '../hooks/useKeyControls';

export default function GameBoard() {
  const [size, setSize] = useState(4);
  const [board, setBoard] = useState(() => addRandomTile(addRandomTile(createEmptyBoard(4))));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('best2048') || '0', 10));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const init = useCallback((s = size) => {
    const empty = createEmptyBoard(s);
    const withOne = addRandomTile(empty);
    const withTwo = addRandomTile(withOne);
    setBoard(withTwo);
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

    if (hasWon(withNewTile)) setWon(true);
    else if (!hasMoves(withNewTile)) setGameOver(true);
  }, [board, gameOver, won, best]);

  // keyboard controls (arrow keys + R)
  useKeyControls(handleMove, () => init());

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div>
        <Header score={score} best={best} onRestart={() => init()} />

        <Controls size={size} setSize={setSize} onApplySize={() => init(size)} />

        <BoardGrid board={board} />

        <div className="mt-4 text-sm text-gray-600">
          Controls: Arrow keys. Press <span className="font-mono">R</span> to restart.
        </div>

        {(gameOver || won) && (
          <div className="mt-6 p-4 bg-white/80 rounded-lg shadow text-center">
            <div className="text-lg font-bold">{won ? 'You reached 2048!' : 'Game Over'}</div>
            <div className="mt-2">Score: {score}</div>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg mr-2"
                onClick={() => init()}
              >
                Play Again
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setGameOver(false);
                  setWon(false);
                }}
              >
                Continue (ignore win)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
