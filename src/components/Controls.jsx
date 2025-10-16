import React from 'react';

export default function Controls({ size, setSize, onApplySize }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <label className="text-sm">Board size (Y x Y):</label>
      <input
        type="number"
        min={3}
        max={8}
        value={size}
        onChange={(e) => setSize(Number(e.target.value || 4))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onApplySize();
        }}
        className="w-20 p-2 border rounded"
      />
      <div className="text-sm text-gray-500">(3–8 supported)</div>
    </div>
  );
}
