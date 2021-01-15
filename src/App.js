import { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import PlacingBoats from './components/PlacingBoats';
import Game from './components/Game';
import {
  factoryGameboard,
  giveShipCoords,
  shiftAxis,
} from './modules/gameboardLogic';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  //This should be here
  const [computerDifficulty, setComputerDifficulty] = useState(0);
  const [playerBoard, setPlayerBoard] = useState(factoryGameboard(10, false));

  const changeDifficulty = (newDifficulty) => {
    setComputerDifficulty(newDifficulty);
  };

  const nextScreen = () => {
    let current = currentScreen;
    current++;
    if (current > 2) current = 0;

    setCurrentScreen(current);
  };

  const placeShip = (coord, pieceLength, axis) => {
    let newGameboard = { ...playerBoard };
    newGameboard.placeShip(coord, pieceLength, axis);
    setPlayerBoard(newGameboard);
  };

  return (
    <div id="content">
      {currentScreen === 0 ? (
        <TitleScreen
          nextScreen={nextScreen}
          changeDifficulty={changeDifficulty}
        />
      ) : currentScreen === 1 ? (
        <div>
          <div className="gameboard-header">
            <h1>Place your float</h1>
          </div>
          <div className="gameboard-wrapper">
            <PlacingBoats
              playerBoard={playerBoard}
              placeShip={placeShip}
              nextScreen={nextScreen}
            />
          </div>
        </div>
      ) : (
        <Game
          playerBoard={playerBoard}
          computerDifficulty={computerDifficulty}
        />
      )}
    </div>
  );
}
