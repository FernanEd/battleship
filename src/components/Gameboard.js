import { useEffect, useState } from 'react';
import { factoryGameboard, giveShipCoords, shiftAxis } from '../gameboardLogic';
import Cell from './Cell';
import boardAnalisis from '../cpuLogic';

export default function Gameboard({
  isPlayerBoard,
  isPlayerTurn,
  changeTurn,
  computerDifficulty,
  isGameover,
  makeGameOver,
}) {
  // BOARD STATE
  const boardWidth = 10;
  const [gameboard, setGameboard] = useState(
    factoryGameboard(boardWidth, !isPlayerBoard)
  );

  const markSpot = (coord) => {
    let newGameboard = { ...gameboard };
    newGameboard.receiveAttack(coord);
    setGameboard(newGameboard);
  };

  const makeCPUmove = () => {
    let { boatsCoords, hitsCoords, missesCoords } = gameboard;
    markSpot(
      boardAnalisis(computerDifficulty, boatsCoords, [
        ...hitsCoords,
        ...missesCoords,
      ])
    );
    changeTurn();
  };

  //After this function runs, the useEffect of the bottom is supposed to run
  const handleClick = (cellIndex) => {
    let { boatsCoords, hitsCoords, missesCoords } = gameboard;

    let usedCoords = [...hitsCoords, ...missesCoords];
    if (isPlayerTurn && !usedCoords.includes(cellIndex) && !isGameover) {
      markSpot(cellIndex);
      changeTurn();
    }
  };

  // Every time a move is made
  useEffect(() => {
    if (gameboard.checkGameOver()) {
      makeGameOver();
    }

    // Make the CPU move on turn change
    if (!isPlayerTurn && isPlayerBoard) makeCPUmove();
  }, [isPlayerTurn]);

  return (
    <div className="gameboard-grid">
      {[...new Array(boardWidth * boardWidth)].map((a, i) => {
        let { boatsCoords, hitsCoords, missesCoords } = gameboard;
        return (
          <Cell
            key={i}
            index={i}
            isPlayerBoard={isPlayerBoard}
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
