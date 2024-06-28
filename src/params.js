function shipIdGenerator() {
  let invalidIds = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  let randomStartId;
  do {
    randomStartId = Math.floor(Math.random() * 100);
  } while (invalidIds.includes(randomStartId));
  return randomStartId;
}

function randomLengtnGenerator() {
  const randomLength = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  console.log(randomLength);
  return randomLength;
}

function randomBooleanGenerator() {
  return Math.random() >= 0.5;
}

function shipParams() {
  let startId;
  let length;
  let isHorizontal;
  let positionsValid;

  do {
    startId = shipIdGenerator();
    length = randomLengtnGenerator();
    isHorizontal = randomBooleanGenerator();
    positionsValid = checkValidPositions(startId, length, isHorizontal);
  } while (!positionsValid);

  return {
    startId,
    length,
    isHorizontal,
  };
}

function checkValidPositions(startId, length, isHorizontal) {
  const row = Math.floor(startId / 10);
  const col = startId % 10;

  if (isHorizontal) {
    if (col + length > 10) return false;
  } else {
    if (row + length > 10) return false;
  }
  return true;
}
export { shipParams };
