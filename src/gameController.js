import GameBoard from './gameBoard';
import { playerBoard, computerBoard } from '.';

const a = playerBoard;
let isPlayerTurn = true;

const unavailableCells = new Set();
let hitCellsQueue = [];

function playerMove(playerBoard, boardOfComputer) {
  const computerBoard = document.querySelector('.gameboard-c');
  const cells = computerBoard.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const id = getCellId(cell);
      handlePlayerClickCaller(cell, id, boardOfComputer);
    });
  });
}

function handlePlayerClick(cell) {
  if (!isPlayerTurn) return;
  let hit = false;
  const cellId = getCellId(cell);
  const { row, col } = getRowAndCol(cellId);

  if (cell.classList.contains('target')) {
    addClass(cell, 'sunk');
    hit = true;
    computerBoard.receiveAttack(row, col);
    ifWins(computerBoard, 'Player');
  } else {
    addClass(cell, 'non-ship-cell');
  }
  console.log(computerBoard.board);

  checkCell(cellId, computerBoard);

  // Switch to computer's turn
  if (hit) {
    playerMove(computerBoard);
  } else {
    isPlayerTurn = false;
    whoseTurnUpdater();
    setTimeout(() => computerMove(playerBoard), 1000); // Add a delay for better UX
  }
}

function checkCell(cellId, board) {
  const { row, col } = getRowAndCol(cellId);
  const indices = board.board[row][col];
  console.log(indices);
  return indices;
}

export function computerMove(board) {
  let availableCells = [];
  const cells = document.querySelectorAll('.cell');
  console.log(hitCellsQueue);

  if (hitCellsQueue.length > 0) {
    const nextCellId = hitCellsQueue.shift();
    const { row, col } = getRowAndCol(nextCellId);
    const cell = document.querySelector(`#gameboard-p-${nextCellId}`);
    if (cell) {
      handleComputerClick(cell);
      return;
    }
  }

  cells.forEach((cell) => {
    if (
      !cell.classList.contains('non-ship-cell') &&
      !cell.classList.contains('sunk')
    ) {
      availableCells.push(cell);
    }
  });

  if (availableCells.length === 0) return; // Prevent errors if no cells are available

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const randomCell = availableCells[randomIndex];

  handleComputerClick(randomCell, playerBoard);
}

function handleComputerClick(cell) {
  const cellId = getCellId(cell);
  const { row, col } = getRowAndCol(cellId);
  const box = document.querySelector(`#gameboard-p-${cellId}`);

  let hit = false;
  if (box.classList.contains('target')) {
    box.classList.add('sunk');
    playerBoard.receiveAttack(row, col);
    hit = true;
    ifWins(playerBoard, 'Computer');
    enqueueAdjacentCells(row, col);
  } else {
    box.classList.add('non-ship-cell');
  }
  console.log(playerBoard.board);

  if (hit) {
    // If the computer hits a ship, it gets another turn
    setTimeout(() => computerMove(playerBoard), 1000); // Add a delay for better UX
  } else {
    // Switch back to player's turn
    isPlayerTurn = true;
    whoseTurnUpdater();
  }
}

function getCellId(cell) {
  const id = cell.id.match(/\d+/g);
  return parseInt(id, 10); // Ensure it's a number
}

function getRowAndCol(cellId) {
  const row = Math.floor(cellId / 10);
  const col = cellId % 10;
  return { row, col };
}

export { playerMove };

function addClass(cell, className) {
  cell.classList.add(`${className}`);
}

function whoseTurnUpdater() {
  const turnHeading = document.querySelector('.whoseTurnh2');
  turnHeading.textContent = isPlayerTurn ? "Player's Turn" : "Computer's Turn";
}

function handlePlayerClickCaller(cell, id, boardOfComputer) {
  if (!unavailableCells.has(id) && isPlayerTurn) {
    handlePlayerClick(cell, boardOfComputer);
    unavailableCells.add(id);
  }
}

function determineShipHit() {}

function ifWins(board, name) {
  if (board.allShipsSunk()) {
    changeTextContentofh2(name);
  }
}

function changeTextContentofh2(name) {
  const h2 = document.querySelector('.whoseTurnh2');
  h2.textContent = `${name} Wins!`;
}

function enqueueAdjacentCells(row, col) {
  const directions = [
    { row: -1, col: 0 }, // Up
    { row: 1, col: 0 }, // Down
    { row: 0, col: -1 }, // Left
    { row: 0, col: 1 }, // Right
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    const newCellId = newRow * 10 + newCol;

    if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
      if (!unavailableCells.has(newCellId)) {
        hitCellsQueue.push(newCellId);
      }
    }
  });
}
