// utils/colors.js
// Central place for tile styling rules so components stay declarative.
export const tileClass = (v) => {
  const base =
    'w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl font-bold text-xl sm:text-2xl';
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
