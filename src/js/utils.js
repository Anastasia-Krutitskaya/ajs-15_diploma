export function calcTileType(index, boardSize) {
  let boardEdge = '';
  const rightSide = [];
  for (let i = 1; i < boardSize; i++) {
    const rightSideEl = boardSize * i;
    rightSide.push(rightSideEl - 1);
  }
  if (index === 0) {
    boardEdge = 'top-left';
  } else if (index > 0 && index < (boardSize - 1)) {
    boardEdge = 'top';
  } else if (!(index % boardSize) && index !== boardSize * (boardSize - 1)) {
    boardEdge = 'left';
  } else if (index === boardSize * (boardSize - 1)) {
    boardEdge = 'bottom-left';
  } else if (index === boardSize - 1) {
    boardEdge = 'top-right';
  } else if (rightSide.includes(index)) {
    boardEdge = 'right';
  } else if (index === boardSize ** 2 - 1) {
    boardEdge = 'bottom-right';
  } else if (index > boardSize * (boardSize - 1) && index < boardSize ** 2 - 1) {
    boardEdge = 'bottom';
  } else {
    boardEdge = 'center';
  }
  return boardEdge;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
