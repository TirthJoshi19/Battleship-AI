class Ship {
  constructor(length) {
    this.length = length;
    this.sunk = false;
    this.hits = Array(length).fill(false);
  }

  isSunk() {
    return this.hits.every((hit) => hit);
  }

  hit(position) {
    this.hits[position] = true;
  }
}

export default Ship;
