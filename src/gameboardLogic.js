// HELPER FUNCTIONS

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

//////////////////////////////////////////////////////////////////////////////////////////////////////

function factoryGameboard(boardWidth, generateBoard) {
  let boats = [];

  let boatsCoords = []; //All coords that are boats
  let hitsCoords = []; //All coords of boats hits
  let missesCoords = []; //All coords of missed shots

  //Axis should be either 0 or 1 for x or y
  const placeShip = (coord, pieceLength, axis) => {
    boats.push({
      isSunk: false,
      pieceLength,
      coords: giveShipCoords(boardWidth, coord, pieceLength, axis),
    });

    updateBoatCoords();
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

  const updateBoatCoords = () => {
    boatsCoords = boats.map((boat) => boat.coords).flat();
  };

  const checkGameOver = () => {
    return boatsCoords.length > 0 && boats.every((boat) => boat.isSunk);
  };

  const placeComputerShips = () => {
    let shipLengths = [5, 4, 3, 2, 2];

    shipLengths.forEach((shipLength) => {
      let cellCoord = Math.floor(Math.random() * 99); //From 0 to 99
      let axis = Math.round(Math.random()); //Either 0 or 1
      let shipPotentialCoords = giveShipCoords(
        boardWidth,
        cellCoord,
        shipLength,
        axis
      );

      // WARNING: The order of these conditions it's important, leftone must evaluate first
      // If any coord it's already ocuppied, generate new coords
      while (
        shipPotentialCoords === null ||
        shipPotentialCoords.some((coord) => boatsCoords.includes(coord))
      ) {
        cellCoord = Math.floor(Math.random() * 99); //From 0 to 99
        axis = Math.round(Math.random()); //Either 0 or 1
        shipPotentialCoords = giveShipCoords(
          boardWidth,
          cellCoord,
          shipLength,
          axis
        );
      }

      //Now the cell and axis is addecuate to place a ship
      placeShip(cellCoord, shipLength, axis);
    });
  };

  if (generateBoard) placeComputerShips();

  return {
    boatsCoords,
    hitsCoords,
    missesCoords,
    placeShip,
    receiveAttack,
    checkGameOver,
    placeComputerShips,
  };
}

export { factoryGameboard, giveShipCoords, shiftAxis };
