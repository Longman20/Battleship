import shipFactory from "./Ship";

test("returns an object with the correct length", () => {
  const ship = shipFactory(3);
  expect(ship.length).toBe(3);
});
test("returns a freshly created ship with 0 hits", () => {
  const ship = shipFactory(3);
  expect(ship.hits).toBe(0);
});
test("returns hit count by 1", () => {
  const ship = shipFactory(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});
test("returns if the ship is sunk when hits equal length", () => {
  const ship = shipFactory(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
test("returns if the ship is not sunk when hits are less than length", () => {
  const ship = shipFactory(2);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
