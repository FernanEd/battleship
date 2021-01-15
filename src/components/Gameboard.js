import { useEffect, useState } from 'react';
import {
  factoryGameboard,
  giveShipCoords,
  shiftAxis,
} from '../modules/gameboardLogic';
import Cell from './Cell';
import boardAnalisis from '../modules/cpuLogic';

import anime from 'animejs/lib/anime.es.js';

export default function Gameboard({
  playerBoard,
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

  //If is the player board, place the boat placement
  useEffect(() => {
    if (isPlayerBoard) {
      let newBoard = { ...playerBoard };
      setGameboard(newBoard);
    }
  }, []);

  const markSpot = (coord) => {
    animateSpot(
      isPlayerBoard ? `#player-cell-${coord}` : `#computer-cell-${coord}`
    );

    let newGameboard = { ...gameboard };
    newGameboard.receiveAttack(coord);
    setGameboard(newGameboard);

    //Check for gameovers, end game
    if (gameboard.checkGameOver()) {
      makeGameOver(isPlayerTurn);
    }
  };

  const animateSpot = (targetID) => {
    anime({
      targets: targetID,
      opacity: [0, 1],
      scale: [1.6, 1],
      duration: 700,
    });
  };

  const makeCPUmove = () => {
    let [boatsCoords, hitsCoords, missesCoords] = [
      gameboard.getBoatsCoords(),
      gameboard.getHitsCoords(),
      gameboard.getMissesCoords(),
    ];
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
    let [boatsCoords, hitsCoords, missesCoords] = [
      gameboard.getBoatsCoords(),
      gameboard.getHitsCoords(),
      gameboard.getMissesCoords(),
    ];

    let usedCoords = [...hitsCoords, ...missesCoords];
    if (isPlayerTurn && !usedCoords.includes(cellIndex) && !isGameover) {
      markSpot(cellIndex);
      changeTurn();
    }
  };

  // Every time a move is made
  useEffect(() => {
    // Make the CPU move on turn change
    if (!isPlayerTurn && isPlayerBoard && !isGameover)
      setTimeout(makeCPUmove, 500);
  }, [isPlayerTurn]);

  return (
    <div className="gameboard-grid">
      {[...new Array(boardWidth * boardWidth)].map((a, i) => {
        let [boatsCoords, hitsCoords, missesCoords] = [
          gameboard.getBoatsCoords(),
          gameboard.getHitsCoords(),
          gameboard.getMissesCoords(),
        ];
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
