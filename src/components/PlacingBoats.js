import { useEffect, useState } from 'react';
import { factoryGameboard, giveShipCoords, shiftAxis } from '../gameboardLogic';
import Cell from './Cell';

export default function PlacingBoats({ playerBoard }) {
  // BOARD STATE
  const boardWidth = 10;
  const gameboard = playerBoard;

  const markSpot = (coord) => {
    /*
    let newGameboard = { ...gameboard };
    newGameboard.receiveAttack(coord);
    setGameboard(newGameboard);
    */
  };

  //After this function runs, the useEffect of the bottom is supposed to run
  const handleClick = (cellIndex) => {
    let { boatsCoords, hitsCoords, missesCoords } = gameboard;

    let usedCoords = [...hitsCoords, ...missesCoords];
    if (!usedCoords.includes(cellIndex)) {
      markSpot(cellIndex);
    }
  };

  return (
    <div className="gameboard-grid">
      {[...new Array(boardWidth * boardWidth)].map((a, i) => {
        let { boatsCoords, hitsCoords, missesCoords } = gameboard;
        return (
          <Cell
            key={i}
            index={i}
            isHit={hitsCoords.includes(i)}
            isBoat={boatsCoords.includes(i)}
            isMiss={missesCoords.includes(i)}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
}
