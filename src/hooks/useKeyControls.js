import { useEffect } from 'react';

/**
 * useKeyControls
 * Attaches a keyboard listener for arrow keys and 'r' for reset.
 * onMove(direction) where direction is 'left'|'right'|'up'|'down'
 * onReset() called when 'r' or 'R' is pressed.
 */
export function useKeyControls(onMove, onReset) {
  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down',
      };
      if (map[e.key]) {
        e.preventDefault();
        onMove(map[e.key]);
      } else if (e.key === 'r' || e.key === 'R') {
        onReset();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onMove, onReset]);
}
