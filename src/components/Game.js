import { useEffect, useState } from 'react';
import Gameboard from './Gameboard';

export default function Game({ computerDifficulty }) {
  //player 0 = human, player 1 = computer
  let [isPlayerTurn, setisPlayerTurn] = useState(true);

  const changeTurn = () => {
    let lastTurn = isPlayerTurn;
    setisPlayerTurn(!lastTurn);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="gameboard-header">
        <h1>{isPlayerTurn ? 'Make your turn' : 'CPU turn'}</h1>
      </div>

      <div className="gameboard-wrapper">
        <div>
          <h1>Player board</h1>
          <Gameboard
            isPlayerBoard={true}
            isPlayerTurn={isPlayerTurn}
            changeTurn={changeTurn}
            computerDifficulty={computerDifficulty}
          />
        </div>
        <div>
          <h1>Computer board</h1>
          <Gameboard
            isPlayerBoard={false}
            isPlayerTurn={isPlayerTurn}
            changeTurn={changeTurn}
            computerDifficulty={computerDifficulty}
          />
        </div>
      </div>
    </div>
  );
}
