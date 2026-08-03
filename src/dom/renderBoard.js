function renderBoard(gameboard, container) {
  container.innerHTML = "";
  const board = gameboard.board;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;

      const isHit = gameboard.hitCells.some(([x, y]) => x === i && y === j);
      const isMiss = gameboard.missed.some(([x, y]) => x === i && y === j);

      if (board[i][j] !== null) {
        cell.classList.add("ship");
      }
      if (isHit) {
        cell.classList.add("hit");
      }
      if (isMiss) {
        cell.classList.add("miss");
      }

      container.appendChild(cell);
    }
  }
}
export default renderBoard;
