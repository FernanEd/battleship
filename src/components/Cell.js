export default function Cell({
  isPlayerBoard,
  isHit,
  isBoat,
  isMiss,
  index,
  handleClick,
}) {
  //For player boat
  if (isPlayerBoard) {
    return (
      <div
        id={`player-cell-${index}`}
        className={isHit ? 'hit' : isBoat ? 'boat' : isMiss ? 'miss' : 'cell'}
      ></div>
    );
  }

  return (
    <div
      id={`computer-cell-${index}`}
      onClick={() => handleClick(index)}
      className={isHit ? 'hit' : isMiss ? 'miss' : 'cell'}
    ></div>
  );
}
