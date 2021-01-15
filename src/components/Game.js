import { useEffect, useState } from 'react';
import Gameboard from './Gameboard';
import { ImUser, ImSmile2, ImGrin2, ImEvil2 } from 'react-icons/im';

export default function Game({ playerBoard, computerDifficulty }) {
  //player 0 = human, player 1 = computer
  let [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isGameover, setIsGameover] = useState(false);
  const [winner, setWinner] = useState();

  const changeTurn = () => {
    let lastTurn = isPlayerTurn;
    setIsPlayerTurn(!lastTurn);
  };

  const makeGameOver = (didPlayerWin) => {
    setIsGameover(true);
    if (didPlayerWin) setWinner('Player');
    else setWinner('CPU');
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="gameboard-header">
        <h1>
          {isGameover
            ? `${winner} wins!`
            : isPlayerTurn
            ? 'Make your turn'
            : 'CPU turn'}
        </h1>
      </div>

      <div className="gameboard-wrapper">
        <div>
          <h1 className="gameboard-title">
            Player <ImUser />
          </h1>
          <Gameboard
            isPlayerBoard={true}
            isPlayerTurn={isPlayerTurn}
            playerBoard={playerBoard}
            changeTurn={changeTurn}
            computerDifficulty={computerDifficulty}
            isGameover={isGameover}
            makeGameOver={makeGameOver}
          />
        </div>
        <div>
          <h1 class="gameboard-title">
            Computer{' '}
            {computerDifficulty === 2 ? (
              <ImEvil2 />
            ) : computerDifficulty === 1 ? (
              <ImGrin2 />
            ) : (
              <ImSmile2 />
            )}
          </h1>
          <Gameboard
            isPlayerBoard={false}
            isPlayerTurn={isPlayerTurn}
            changeTurn={changeTurn}
            computerDifficulty={computerDifficulty}
            isGameover={isGameover}
            makeGameOver={makeGameOver}
          />
        </div>
      </div>
    </div>
  );
}
