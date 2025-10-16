import React from 'react';

export default function Header({ score, best, onRestart }) {
  return (
    <div className="flex items-center justify-between mb-4">
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
          onClick={onRestart}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
