import gameboardFactory from "./Gameboard";

function playerFactory(type = "real") {
  const player = {
    gameboard: gameboardFactory(),
    type: type,
    getRandomCoordinates() {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      return [row, col];
    },
    makeRandomMove(enemyGameboard) {
      let row, col;
      let legal = false;
      while (!legal) {
        [row, col] = this.getRandomCoordinates();
        const alreadyMissed = enemyGameboard.missed.some(
          ([x, y]) => x === row && y === col,
        );
        const alreadyHit = enemyGameboard.hitCells.some(
          ([x, y]) => x === row && y === col,
        );
        if (!alreadyMissed && !alreadyHit) {
          legal = true;
        }
      }
      enemyGameboard.receiveAttack([row, col]);
    },
  };
  return player;
}

export default playerFactory;
