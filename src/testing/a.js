function factoryGameboard(boardWidth) {
  let boats = [
    { isSunk: false, pieceLength, coords: [1, 11] },
    { isSunk: false, pieceLength, coords: [2, 3, 4, 5, 6] },
  ];

  let boatsCoords = boats.map((boat) => boat.coords).flat(); //All coords that are boats

  let hitsCoords = []; //All coords of boats hits
  let missesCoords = []; //All coords of missed shots

  //Axis should be either 0 or 1 for x or y
  const placeShip = (coord, pieceLength, axis) => {
    boats.push({
      isSunk: false,
      pieceLength,
      coords: giveShipCoords(boardWidth, coord, pieceLength, axis),
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
