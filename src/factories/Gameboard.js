function gameboardFactory() {
  const gameboard = {
    board: Array.from({ length: 10 }, () => Array(10).fill(null)),
    ships: [],
    placeShip(ship, coordinates, direction = "horizontal") {
      const [x, y] = coordinates;
      for (let i = 0; i < ship.length; i++) {
        if (direction === "horizontal") {
          this.board[x][y + i] = ship;
        } else if (direction === "vertical") {
          this.board[x + i][y] = ship;
        }
      }
      this.ships.push(ship);
    },
    receiveAttack(coordinates) {
      const [x, y] = coordinates;
      const ship = this.board[x][y];
      if (ship) {
        ship.hit();
        this.hitCells.push(coordinates);
      } else {
        this.missed.push(coordinates);
      }
    },
    isValidPlacement(row, col, direction, length) {
      for (let i = 0; i < length; i++) {
        const r = direction === "horizontal" ? row : row + i;
        const c = direction === "horizontal" ? col + i : col;
        if (r < 0 || r > 9 || c < 0 || c > 9) return false;
        if (this.board[r][c] !== null) return false;
      }
      return true;
    },
    hitCells: [],
    missed: [],
    allShipsSunk() {
      return this.ships.every((ship) => ship.isSunk());
    },
  };
  return gameboard;
}

export default gameboardFactory;
