export function checkWin(x: number, y: number, area: any[]) {
  let isWinner = false;
  if (
    hasHorizontalWin(-1, area) ||
    hasVerticalWin(-1, area) ||
    hasDiagonalWin(x, y, -1, area)
  ) {
    isWinner = true;
    return "White Wins";
  } else if (
    hasHorizontalWin(1, area) ||
    hasVerticalWin(1, area) ||
    hasDiagonalWin(x, y, 1, area)
  ) {
    isWinner = true;
    return "Black Wins";
  }else {
    return "";
  }
}
function hasHorizontalWin(player: number, area: any[]) {
  let count = 0;
  let isWinner = false;
  for (let row = 0; row < area.length; row++) {
    for (let column = 0; column < area[row].length; column++) {
      if (area[row][column] === player) {
        if (++count === 5) {
          isWinner = true;
          return isWinner;
        }
      }
      else {
        count = 0;
      }    
    }
  }
  return isWinner;
}
function hasVerticalWin(player: number, area: any[]) {
  let count = 0;
  let isWinner = false;
  for (let column = 0; column < area.length; column++) {
    for (let row = 0; row < area[column].length; row++) {
      if (area[row][column] === player) {
        if (++count === 5) {
          isWinner = true;
          return isWinner;
        }
        else isWinner = false;
      }
      else {
        count = 0;
      }
    }
  }
  return isWinner;
}


function hasDiagonalWin(
  x: number,
  y: number,
  player: number,
  area: number[][]
) {
  let count = 0;
  let isWinner = false;
  const left = Math.max(0, x - 5);
  const right = Math.min(area.length - 1, x + 5);
  const top = Math.max(0, y - 5);
  const bottom = Math.min(area.length - 1, y + 5);

  for (let x = left, y = top; x <= right && y <= bottom; x++, y++) {
    if (area[x][y] === player
    ) {
      if (++count >= 5) { 
        isWinner = true;
        return isWinner
      }     
    } else count = 0;
  }

  for (let x = left, y =bottom ; x <= right && y >= top; x++, y--) {
    if (area[x][y] === player
    ) {
      if (++count >= 5) { 
        isWinner = true;
        return isWinner
      }     
    } else count = 0;
  }
  return isWinner;
}
