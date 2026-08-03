import playerFactory from "./Player";

test("player has their own gameboard", () => {
  const player = playerFactory();
  expect(player.gameboard.board.length).toBe(10);
});
test("player is a real player with a gameboard", () => {
  const player = playerFactory();
  expect(player.type).toBe("real");
});
test("player is a computer player when specified", () => {
  const player = playerFactory("computer");
  expect(player.type).toBe("computer");
});
