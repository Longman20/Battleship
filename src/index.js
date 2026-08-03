import playerFactory from "./factories/Player";
import shipFactory from "./factories/Ship";
import renderBoard from "./dom/renderBoard";
import "./style.css";

const humanBoardEl = document.getElementById("human-board");
const computerBoardEl = document.getElementById("computer-board");
const shipYard = document.getElementById("ship-yard");
const rotateBtn = document.getElementById("rotate-btn");
const resetBtn = document.getElementById("reset-btn");

let gameOver = false;
let currentDirection = "horizontal";
let draggedShip = null;
let human, computer;

const shipYardHTML = shipYard.innerHTML;
function placeShipRandomly(gameboard, length) {
  let placed = false;
  while (!placed) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

    if (gameboard.isValidPlacement(row, col, direction, length)) {
      const ship = shipFactory(length);
      gameboard.placeShip(ship, [row, col], direction);
      placed = true;
    }
  }
}

function startGame() {
  gameOver = false;
  currentDirection = "horizontal";
  draggedShip = null;

  human = playerFactory("real");
  computer = playerFactory("computer");

  placeShipRandomly(computer.gameboard, 2);
  placeShipRandomly(computer.gameboard, 3);

  shipYard.innerHTML = shipYardHTML;
  attachDragListeners();

  rotateBtn.textContent = "Rotate";

  renderBoard(human.gameboard, humanBoardEl);
  renderBoard(computer.gameboard, computerBoardEl, true);
}

function attachDragListeners() {
  shipYard.querySelectorAll(".ship-piece").forEach((piece) => {
    piece.addEventListener("dragstart", () => {
      draggedShip = {
        length: parseInt(piece.dataset.length),
        element: piece,
      };
    });
  });
}

rotateBtn.addEventListener("click", () => {
  currentDirection =
    currentDirection === "horizontal" ? "vertical" : "horizontal";
  rotateBtn.textContent = `Rotate (${currentDirection})`;
});

humanBoardEl.addEventListener("dragover", (e) => {
  e.preventDefault();
});

humanBoardEl.addEventListener("drop", (e) => {
  e.preventDefault();
  if (!draggedShip) return;
  if (!e.target.classList.contains("cell")) return;

  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);

  const valid = human.gameboard.isValidPlacement(
    row,
    col,
    currentDirection,
    draggedShip.length,
  );
  if (!valid) {
    alert("Can't place ship there.");
    return;
  }

  const ship = shipFactory(draggedShip.length);
  human.gameboard.placeShip(ship, [row, col], currentDirection);
  renderBoard(human.gameboard, humanBoardEl);

  draggedShip.element.remove();
  draggedShip = null;
});

computerBoardEl.addEventListener("click", (e) => {
  if (gameOver) return;
  if (!e.target.classList.contains("cell")) return;
  if (e.target.classList.contains("hit") || e.target.classList.contains("miss"))
    return;

  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);

  computer.gameboard.receiveAttack([row, col]);
  renderBoard(computer.gameboard, computerBoardEl, true);

  if (computer.gameboard.allShipsSunk()) {
    gameOver = true;
    alert("You win! All enemy ships sunk.");
    return;
  }

  computer.makeRandomMove(human.gameboard);
  renderBoard(human.gameboard, humanBoardEl);

  if (human.gameboard.allShipsSunk()) {
    gameOver = true;
    alert("You lose! All your ships sunk.");
  }
});

resetBtn.addEventListener("click", startGame);

startGame();

export { human, computer };
