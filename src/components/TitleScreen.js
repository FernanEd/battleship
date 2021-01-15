import { ImSmile2, ImGrin2, ImEvil2 } from 'react-icons/im';

export default function TitleScreen({ nextScreen, changeDifficulty }) {
  return (
    <div>
      <h1 id="main-title">Battleship</h1>
      <h2>Select CPU difficulty</h2>
      <div className="difficulty-wrapper">
        <div
          onClick={() => {
            changeDifficulty(0);
            nextScreen();
          }}
          className="difficulty-item"
        >
          <ImSmile2 />
          Mild
        </div>
        <div
          onClick={() => {
            changeDifficulty(1);
            nextScreen();
          }}
          className="difficulty-item"
        >
          <ImGrin2 />
          Spicy
        </div>
        <div
          onClick={() => {
            changeDifficulty(2);
            nextScreen();
          }}
          className="difficulty-item"
        >
          <ImEvil2 />
          Devilish
        </div>
      </div>
    </div>
  );
}
