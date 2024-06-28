import Ship from './ship';

export class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.ships = [];
    this.shipIdCounter = 0;
  }

  createBoard(divClassName) {
    const parent = document.querySelector(`.${divClassName}`);
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      parent.appendChild(cell);
      cell.setAttribute('id', `${divClassName}-${i}`);
    }
  }

  isAdjacentCellOccupied(row, col) {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
        if (this.board[newRow][newCol] !== null) {
          return true;
        }
      }
    }
    return false;
  }

  isValidPlacement(startRow, startCol, length, isHorizontal) {
    if (isHorizontal && startRow + length > 10) {
      return false;
    }
    if (!isHorizontal && startCol + length > 10) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      const currentRow = isHorizontal ? startRow : startRow + i;
      const currentCol = isHorizontal ? startCol + i : startCol;

      if (
        this.board[currentRow][currentCol] !== null ||
        this.isAdjacentCellOccupied(currentRow, currentCol)
      ) {
        return false;
      }
    }

    return true;
  }

  placeShip(startId, length, isHorizontal = false, divClassName) {
    const container = document.querySelector(`.${divClassName}`);
    if (!container) {
      console.log('Container not found');
      return false;
    }

    const startRow = Math.floor(startId / 10);
    const startCol = startId % 10;

    if (!this.isValidPlacement(startRow, startCol, length, isHorizontal)) {
      console.log('Invalid ship placement');
      return false;
    }

    const ship = new Ship(length);
    for (let i = 0; i < length; i++) {
      const currentRow = isHorizontal ? startRow : startRow + i;
      const currentCol = isHorizontal ? startCol + i : startCol;
      const cellId = `${divClassName}-${currentRow * 10 + currentCol}`;

      const cell = container.querySelector(`#${cellId}`);
      if (cell) {
        cell.classList.add(`${divClassName}-ship`);
        cell.classList.add('target');
        this.board[currentRow][currentCol] = { ship, position: i };
      }
    }

    this.ships.push({
      ship,
      startRow,
      startCol,
      length,
      isHorizontal,
      id: this.shipIdCounter,
    });
    this.shipIdCounter++;
    console.log('Ship placed');
    console.log(this.board);
    return true;
  }
  receiveAttack(row, col) {
    if (this.board[row][col] !== null) {
      const { ship, position } = this.board[row][col];
      ship.hit(position);
      console.log(`hit at ${row}, ${col}`);
      this.determineSunkState(ship);

      return true;
    }
    return false;
  }

  determineSunkState(ship) {
    if (ship.isSunk()) {
      ship.sunk = true;
    }
  }

  allShipsSunk() {
    return this.ships.every(({ ship }) => ship.sunk);
  }
}
