import React from 'react';
import Tile from './Tile';
import { tileClass } from '../utils/colors';

export default function BoardGrid({ board }) {
  const size = board.length;
  return (
    <div className="bg-stone-200 p-3 rounded-3xl inline-block">
      <div
        className="grid gap-3 p-3"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board.flatMap((row, r) =>
          row.map((v, c) => <Tile key={`${r}-${c}`} value={v} className={tileClass(v)} />)
        )}
      </div>
    </div>
  );
}
