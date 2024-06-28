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
  });
  playerMove(playerBoard, computerBoard);
});
export { playerBoard, computerBoard };
