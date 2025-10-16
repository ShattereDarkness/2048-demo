
// src/components/GameBoard.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  createEmptyBoard,
  addRandomTile,
  move,
  hasMoves,
  hasWon,
} from '../utils/board';

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

  useEffect(() => init(size), [size]);

  const handleMove = useCallback((direction) => {
    if (gameOver || won) return;
    const oldBoard = board;

    const { board: newBoard, gained, moved } = move(board, direction);
    if (!moved) return;

    let transitions = Array(size * size).fill(0);

    if(direction == 'left') {
      for(let i = 0; i < size * size; i += size) {
        let j = 0, k = 0;
        
        while(j < size) {
          console.log(`i: ${i}, j: ${j}, k: ${k}`);
          console.log(`old: ${oldBoard[i + j]}, new: ${newBoard[i + k]}`);
          if(oldBoard[i + j] !== 0 && newBoard[i + k] !== 0) {
            transitions[i + k] = i + j;
            j++;
            k++;
          } else if(newBoard[i + j] === 0) {
            j++;
          } else if(newBoard[i + k] === 0) {
            break;
          }
        }

        while(j < size) {
          transitions[i + k] = i + j;
          k++;
          j++;
        }
      }

      for (let i = 0; i < transitions.length; i++) {
        console.log(`Element at index ${i}: ${transitions[i]}`);
      }
    }

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

  // todo: Find if reset works after game over
  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowLeft') handleMove('left');
        if (e.key === 'ArrowRight') handleMove('right');
        if (e.key === 'ArrowUp') handleMove('up');
        if (e.key === 'ArrowDown') handleMove('down');
      }
      if (e.key === 'r' || e.key === 'R') init();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleMove, init]);

  // todo: Move this to css as classes
  const tileClass = (v) => {
    const base = 'w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl font-bold text-xl sm:text-2xl';
    const colorMap = {
      0: 'bg-empty',
      2: 'bg-amber-100',
      4: 'bg-amber-200',
      8: 'bg-orange-200 text-white',
      16: 'bg-orange-300 text-white',
      32: 'bg-red-300 text-white',
      64: 'bg-red-400 text-white',
      128: 'bg-green-300 text-white',
      256: 'bg-green-400 text-white',
      512: 'bg-indigo-400 text-white',
      1024: 'bg-indigo-500 text-white',
      2048: 'bg-purple-600 text-white',
    };
    return `${base} ${colorMap[v] || 'bg-gray-600 text-white'}`;
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* <div className="p-6 bg-red-500 text-white font-bold">TAILWIND CHECK — should be red</div> */}

      {/* <div className="max-w-3xl w-full"> */}
     <div>
        <div className="items-center justify-between mb-4">
          <div className="flex items-center justify-center mb-4">
            <h1>2048</h1>
          </div>
          <div className="flex items-center justify-center gap-3 margin-auto">
            <div className="bg-white p-3 rounded-lg shadow items-center">
              <div className="text-xs text-gray-500">Score</div>
              <div className="text-xl font-bold">{score}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow items-center">
              <div className="text-xs text-gray-500">Best</div>
              <div className="text-xl font-bold">{best}</div>
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 items-center"
              onClick={() => init()}
            >
              Restart
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <label className="text-sm">Board size (Y x Y):</label>
          <input
            type="number"
            min={3}
            max={8}
            value={size}
            onChange={(e) => setSize(Number(e.target.value || 4))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') init(size);
            }}
            className="w-20 p-2 border rounded"
          />
          <div className="text-sm text-gray-500">(3–8 supported)</div>
        </div>

        <div className="bg-stone-200 p-3 rounded-3xl inline-block">
          <div
            className="grid gap-3 p-3"
            style={{
              gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            }}
          >
            {board.map((row, r) =>
              row.map((v, c) => (
                <div key={`${r}-${c}`} className={`${tileClass(v)} cell`}>
                  {v !== 0 ? v : ''}
                </div>
              ))
            )}
          </div>
        </div>

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