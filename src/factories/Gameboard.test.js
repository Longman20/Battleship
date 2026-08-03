import shipFactory from "./Ship";
import gameboardFactory from "./Gameboard";

test("returns a gameboard with the correct size", () => {
  const gameboard = gameboardFactory();
  expect(gameboard.board.length).toBe(10);
  expect(gameboard.board[0].length).toBe(10);
});
test("places a ship on the board", () => {
  const gameboard = gameboardFactory();
  const ship = shipFactory(1);
  gameboard.placeShip(ship, [0, 0]);
  expect(gameboard.board[0][0]).toBe(ship);
});
test("places a multi-length ship horizontally", () => {
  const gameboard = gameboardFactory();
  const ship = shipFactory(3);
  gameboard.placeShip(ship, [0, 0], "horizontal");
  expect(gameboard.board[0][0]).toBe(ship);
  expect(gameboard.board[0][1]).toBe(ship);
  expect(gameboard.board[0][2]).toBe(ship);
});
test("checks if a ship is attacked and updates hits", () => {
  const gameboard = gameboardFactory();
  const ship = shipFactory(1);
  gameboard.placeShip(ship, [0, 0]);
  gameboard.receiveAttack([0, 0]);
  expect(ship.hits).toBe(1);
});
test("checks if a ship hit is missed and does not update hits", () => {
  const gameboard = gameboardFactory();
  const ship = shipFactory(1);
  gameboard.placeShip(ship, [0, 0]);
  gameboard.receiveAttack([1, 1]);
  expect(ship.hits).toBe(0);
  expect(gameboard.missed).toContainEqual([1, 1]);
});
test("allShipsSunk returns false when not all ships are sunk", () => {
  const gameboard = gameboardFactory();
  const ship1 = shipFactory(1);
  const ship2 = shipFactory(1);
  gameboard.placeShip(ship1, [0, 0]);
  gameboard.placeShip(ship2, [1, 1]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.allShipsSunk()).toBe(false);
});

test("allShipsSunk returns true when all ships are sunk", () => {
  const gameboard = gameboardFactory();
  const ship1 = shipFactory(1);
  const ship2 = shipFactory(1);
  gameboard.placeShip(ship1, [0, 0]);
  gameboard.placeShip(ship2, [1, 1]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 1]);
  expect(gameboard.allShipsSunk()).toBe(true);
});
