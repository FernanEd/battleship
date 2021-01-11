import { useEffect, useState } from 'react';
import { factoryGameboard, giveShipCoords, shiftAxis } from '../gameboardLogic';
import Cell from './Cell';
import boardAnalisis from '../cpuLogic';

export default function Gameboard({
  isPlayerBoard,
  isPlayerTurn,
  changeTurn,
  computerDifficulty,
}) {
  // BOARD STATE
  const boardWidth = 10;
  const [gameboard, setGameboard] = useState(factoryGameboard(boardWidth));

  const [boatsCoords, setBoatsCoords] = useState(gameboard.boatsCoords);
  const [hitsCoords, setHitsCoords] = useState(gameboard.hitsCoords);
  const [missesCoords, setMissesCoords] = useState(gameboard.missesCoords);

  const markSpot = (coord) => {
    let newGameboard = Object.assign({}, gameboard);
    newGameboard.receiveAttack(coord);

    setGameboard(newGameboard);
    setHitsCoords(newGameboard.hitsCoords);
    setMissesCoords(newGameboard.missesCoords);
  };

  const makeCPUmove = () => {
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
    let usedCoords = [...hitsCoords, ...missesCoords];

    if (isPlayerTurn && !usedCoords.includes(cellIndex)) {
      markSpot(cellIndex);
      changeTurn();
    }
  };

  useEffect(() => {
    // Make the CPU move on turn change
    if (!isPlayerTurn && isPlayerBoard) makeCPUmove();
  }, [isPlayerTurn]);

  useEffect(() => {
    //console.log(gameboard.checkGameOver());
  }, [gameboard]);

  return (
    <div className="gameboard-grid">
      {[...new Array(boardWidth * boardWidth)].map((a, i) => (
        <Cell
          key={i}
          index={i}
          isPlayerBoard={isPlayerBoard}
          isHit={hitsCoords.includes(i)}
          isBoat={boatsCoords.includes(i)}
          isMiss={missesCoords.includes(i)}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
