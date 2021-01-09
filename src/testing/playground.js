const giveShipCoords = (boardWidth, selectedCoord, pieceLength, pieceAxis) => {
  let coordsArray = [];

  let newCoord =
    pieceAxis === 0 ? selectedCoord : shiftAxis(selectedCoord, boardWidth);

  // This comparison only works on x pieceAxis, that's why the convertion
  // The remainder of the cord / boardSize dimention gives
  // how many cells of offset the selectedCoord has from the first cell of the corresponding row
  // If the dimension of the board side minus the piece offset
  // equals the piece lengths it means it will fit perfectly.

  if (!(boardWidth - (newCoord % boardWidth) >= pieceLength)) {
    return null;
  }

  for (let i = newCoord; i < newCoord + pieceLength; i++) {
    if (pieceAxis === 0) coordsArray.push(i);
    else coordsArray.push(shiftAxis(i, boardWidth));
  }

  return coordsArray;
};

// This function works on n * n arrays
function shiftAxis(index, arrayWidth) {
  // if coord is y axis, convert it to it's correspondant as x axis otherwise leave it as it is
  // That expresion basically shifts the axis
  return (index % arrayWidth) * arrayWidth + 1 * ((index / arrayWidth) | 0);
}

function factoryGameboard(sideLength) {
  let boats = [
    { isSunk: false, length, coords: [1, 11] },
    { isSunk: false, length, coords: [2, 3, 4, 5, 6] },
  ];

  let boatsCoords = boats.map((boat) => boat.coords).flat(); //All coords that are boats

  let hitsCoords = []; //All coords of boats hits
  let missesCoords = []; //All coords of missed shots

  //Axis should be either 0 or 1 for x or y
  const placeShip = (coord, length, axis) => {
    boats.push({
      isSunk: false,
      length,
      coords: giveShipCoords(sideLength, coord, length, axis),
    });
  };

  const checkSunkenShips = () => {
    boats.forEach((boat) => {
      let { coords } = boat;
      //If every coord of the boat IS in hit coords array
      if (coords.every((coord) => hitsCoords.includes(coord))) {
        boat.isSunk = true;
      }
    });
  };

  const receiveAttack = (coord) => {
    if (boatsCoords.includes(coord)) hitsCoords.push(coord);
    else missesCoords.push(coord);

    checkSunkenShips();
  };

  const checkGameOver = () => {
    return boats.every((boat) => boat.isSunk);
  };

  return { hitsCoords, missesCoords, placeShip, receiveAttack, checkGameOver };
}

export { factoryGameboard, giveShipCoords, shiftAxis };
