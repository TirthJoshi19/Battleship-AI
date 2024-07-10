import { GameBoard } from './gameBoard';
import { computerMove, playerMove } from './gameController';
import { shipParams } from './params';

const computerBoard = new GameBoard();
const playerBoard = new GameBoard();
document.addEventListener('DOMContentLoaded', () => {
  playerBoard.createBoard('gameboard-p');
  computerBoard.createBoard('gameboard-c');

  function placeRandomShips(board, divClassName) {
    resetBtn.addEventListener('click', () => {
      location.reload();
    });
    const { startId, length, isHorizontal } = shipParams(divClassName);

    const success = board.placeShip(
      startId,
      length,
      isHorizontal,
      divClassName
    );

    if (!success) {
      placeRandomShips(board, divClassName);
    }
  }
  const resetBtn = document.querySelector('#resetBtn');

  function placeFourShips() {
    for (let i = 0; i < 4; i++) {
      placeRandomShips(playerBoard, 'gameboard-p');
      placeRandomShips(computerBoard, 'gameboard-c');
    }
  }
  resetBtn.addEventListener('click', () => {
    placeFourShips();
    setTurnUtil();
  });

  const winReset = document.getElementById('win-reset');

  winReset.addEventListener('click', () => {
    location.reload();
  });
  playerMove(playerBoard, computerBoard);
});

function setTurnUtil() {
  const whoseTurnDiv = document.querySelector('.whoseTurn');
  const whoseTurnH2 = whoseTurnDiv.querySelector('h2');
  whoseTurnH2.textContent = `Player's Turn`;
}
export { playerBoard, computerBoard };
