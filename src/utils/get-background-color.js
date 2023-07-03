const getBackgroundColor = (isOver, canDrop, color) => {
  if (isOver) {
    if (canDrop) {
      return color;
    } if (!canDrop) {
      return 'rgb(255,188,188)';
    }
  }

  return '';
};

export { getBackgroundColor };
