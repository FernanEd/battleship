const placeShip = (boardWidth, selectedCoord, pieceLength, pieceAxis) => {
  let coordsArray = [];

  let newCord =
    pieceAxis === 0 ? selectedCoord : shiftAxis(selectedCoord, boardWidth);

  // This comparison only works on x pieceAxis, that's why the convertion
  // The remainder of the cord / boardSize dimention gives
  // how many cells of offset the selectedCoord has from the first cell of the corresponding row
  // If the dimension of the board side minus the piece offset
  // equals the piece lengths it means it will fit perfectly.

  if (!(boardWidth - (newCord % boardWidth) >= pieceLength)) {
    return null;
  }

  for (let i = coordsArray; i < coordsArray + pieceLength; i++) {
    coordsArray.push(i);
  }

  return pieceAxis === 0
    ? coordsArray
    : coordsArray.map((selectedCoord) => shiftAxis(selectedCoord, boardWidth));
};
