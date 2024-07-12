import GameBoard from './gameBoard';
import { playerBoard, computerBoard } from '.';

const resetBtn = document.querySelector('#resetBtn');

let winner;
let canClick = false;
resetBtn.addEventListener('click', () => {
  canClick = true;
  isPlayerTurn = true; // Ensure the game starts with the player's turn
  unavailableCells.clear(); // Clear unavailable cells for a fresh start
  hitCellsQueue = []; // Clear hit cells queue for a fresh start\
});
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

function handlePlayerClick(cell, boardOfComputer) {
  if (!isPlayerTurn || !canClick) return;

  let hit = false;
  const cellId = getCellId(cell);
  const { row, col } = getRowAndCol(cellId);

  if (cell.classList.contains('target')) {
    addClass(cell, 'sunk');
    hit = true;
    boardOfComputer.receiveAttack(row, col);
    ifWins(boardOfComputer, 'Player');
  } else {
    addClass(cell, 'non-ship-cell');
  }
  console.log(boardOfComputer.board);

  checkCell(cellId, boardOfComputer);

  // Switch to computer's turn
  if (hit) {
    playerMove(boardOfComputer);
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
  if (hitCellsQueue.length > 0) {
    const nextCellId = hitCellsQueue.shift();
    const { row, col } = getRowAndCol(nextCellId);
    const cell = document.querySelector(`#gameboard-p-${nextCellId}`);
    if (cell && !unavailableCells.has(nextCellId)) {
      handleComputerClick(cell);
      return;
    }
  }

  let availableCells = [];
  const cells = document.querySelectorAll('.cell');
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
  } else {
    box.classList.add('non-ship-cell');
  }

  if (hit) {
    setTimeout(() => computerMove(playerBoard), 1000); // Add a delay for better UX
  } else {
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

function ifWins(board, name) {
  if (board.allShipsSunk()) {
    showWinnerUtil(name);
  }
}

function changeTextContentofh2(name) {
  const h2 = document.querySelector('.whoseTurnh2');
  h2.textContent = `${name} Wins!`;
}

function showWinnerUtil(name) {
  const div = document.querySelector('.parent-of-announcement-div');
  if (div) {
    // Ensure the div exists
    addClass(div, 'game-over');
    div.style.display = 'flex';
    setTextUtil(name, div);
    canClick = false;
  } else {
    console.error('Announcement div not found');
  }
}

function setTextUtil(name, div) {
  div.querySelector('h2').textContent = name + ' Has Won!';
}
