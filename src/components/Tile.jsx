import React from 'react';

export default function Tile({ value, className }) {
  return <div className={`${className} cell`}>{value !== 0 ? value : ''}</div>;
}
