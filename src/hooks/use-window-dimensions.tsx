import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return { width, height };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [600]);

  return windowDimensions;
}

const visibleBlocksNumber: Record<number, Record<string, number>> = {
  0: { blocks: 1 },
  1: { blocks: 2 },
};

export function getVisualProps({ width }: { width: number }) {
  let point = 0;

  if (width > 600) {
    point = 1;
  }

  return visibleBlocksNumber[point];
}
