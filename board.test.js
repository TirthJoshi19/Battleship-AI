import { GameBoard } from './src/gameBoard';

const a = new GameBoard();
const board = a.board;
board[4][5] = 'kitty';

function recievAttackMock(row, col) {
  if (board[row][col] !== null) {
    return true;
  }
  return false;
}

test('it', () => {
  expect(recievAttackMock(4, 5)).toBe(true);
});
