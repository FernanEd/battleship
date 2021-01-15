import { useEffect, useState } from 'react';
import {
  factoryGameboard,
  giveShipCoords,
  shiftAxis,
} from '../modules/gameboardLogic';

import anime from 'animejs/lib/anime.es.js';

export default function PlacingBoats({ playerBoard, placeShip, nextScreen }) {
  // BOARD STATE
  const boardWidth = 10;
  const pieces = [5, 4, 3, 2, 2];
  let [currentPiece, setCurrentPiece] = useState(0);

  const [hoverCells, setHoverCells] = useState([]);
  const [axis, setAxis] = useState(0);
  const [pieceLength, setPieceLength] = useState(pieces[currentPiece]);

  //After this function runs, the useEffect of the bottom is supposed to run
  const handleClick = (cellIndex) => {
    let boatsCoords = playerBoard.getBoatsCoords();

    let shipPotentialCoords = giveShipCoords(
      boardWidth,
      cellIndex,
      pieceLength,
      axis
    );

    if (
      shipPotentialCoords &&
      shipPotentialCoords.every((coord) => !boatsCoords.includes(coord))
    ) {
      makePlacingAnimation(
        shipPotentialCoords.map((coord) => `#cell-${coord}`)
      );
      let lastPiece = currentPiece;
      setCurrentPiece(lastPiece + 1);
      setPieceLength(pieces[lastPiece + 1]);
      placeShip(cellIndex, pieceLength, axis);
    }
  };

  const makePlacingAnimation = (targetsID) => {
    anime({
      targets: targetsID,
      opacity: [0, 1],
      scale: [1.6, 1],
      duration: 700,
    });
  };

  const handleHover = (cellIndex) => {
    let newCoord = axis === 0 ? cellIndex : shiftAxis(cellIndex, boardWidth);

    if (!(boardWidth - (newCoord % boardWidth) >= pieceLength)) {
      setHoverCells([]);
      return;
    }

    let cells = [];

    for (let i = newCoord; i < newCoord + pieceLength; i++) {
      if (axis === 0) cells.push(i);
      else cells.push(shiftAxis(i, boardWidth));
    }

    setHoverCells(cells);
  };

  const toggleAxis = () => {
    setAxis(axis === 0 ? 1 : 0);
  };

  return (
    <div className="placing-wrapper">
      <button className="btn btn-secondary" onClick={toggleAxis}>
        Shift axis
      </button>
      <div className="gameboard-grid">
        {[...new Array(boardWidth * boardWidth)].map((a, i) => {
          let [boatsCoords, hitsCoords, missesCoords] = [
            playerBoard.getBoatsCoords(),
            playerBoard.getHitsCoords(),
            playerBoard.getMissesCoords(),
          ];
          return (
            <div
              id={`cell-${i}`}
              key={i}
              index={i}
              onMouseEnter={() => handleHover(i)}
              onClick={() => handleClick(i)}
              className={
                boatsCoords.includes(i)
                  ? 'boat'
                  : hoverCells.includes(i)
                  ? 'hovered'
                  : 'cell'
              }
            ></div>
          );
        })}
      </div>
      {currentPiece >= pieces.length ? (
        <button className="btn btn-primary" onClick={nextScreen}>
          Start game
        </button>
      ) : null}
    </div>
  );
}
