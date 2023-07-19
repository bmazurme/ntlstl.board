const getBackgroundColor = (isOver: boolean, canDrop: boolean, color: string) => {
  if (isOver) {
    if (canDrop) {
      return color;
    }

    if (!canDrop) {
      return 'rgb(255,188,188)';
    }
  }

  return '';
};

export { getBackgroundColor };
