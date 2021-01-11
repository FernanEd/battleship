export default function boardAnalisis(difficulty, boatsCoords, usedCoords) {
  const makeRandomMove = () => {
    let number = Math.floor(Math.random() * 100);
    let i = 0;

    // i will prevent infinite loops
    while (usedCoords.includes(number) && i < 100) {
      number = Math.floor(Math.random() * 100);
      i++;
    }
    return number;
  };

  const makeCheatMove = () => {
    let index = Math.floor(Math.random() * boatsCoords.length);
    let i = 0;

    // i will prevent infinite loops
    while (usedCoords.includes(boatsCoords[index]) && i < 100) {
      index = Math.floor(Math.random() * boatsCoords.length);
      i++;
    }
    return boatsCoords[index];
  };

  // Difficulty: | 0 - Standard | 1 - Smart | 2 - Hard
  let cheatChance = difficulty === 2 ? 25 : difficulty === 1 ? 13 : 7;

  let randNum = Math.round(Math.random() * 100);
  let canCheat = randNum < cheatChance;

  return canCheat ? makeCheatMove() : makeRandomMove();
}
