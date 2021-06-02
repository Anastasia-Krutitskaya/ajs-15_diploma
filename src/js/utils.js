export function calcTileType(index, boardSize) {
  // TODO: write logic here
  return 'center'; // 'top-left', 'top-right', 'top', 'bottom-left', 'bottom-right', 'bottom', 'right', 'left', ;
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
