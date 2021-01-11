import { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import PlacingBoats from './components/PlacingBoats';
import Game from './components/Game';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  //This should be here
  const [computerDifficulty, setComputerDifficulty] = useState(0);

  const changeDifficulty = (newDifficulty) => {
    setComputerDifficulty(newDifficulty);
  };

  const nextScreen = () => {
    let current = currentScreen;
    current++;
    if (current > 2) current = 0;

    setCurrentScreen(current);
  };

  return (
    <div id="content">
      {currentScreen === 0 ? (
        <TitleScreen
          nextScreen={nextScreen}
          changeDifficulty={changeDifficulty}
        />
      ) : currentScreen === 1 ? (
        <PlacingBoats nextScreen={nextScreen} />
      ) : (
        <Game computerDifficulty={computerDifficulty} />
      )}
    </div>
  );
}
