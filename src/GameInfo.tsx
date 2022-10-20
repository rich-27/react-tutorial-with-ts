import { BoardState, calculateWinner, Player } from "./utils";

type GameInfoProps = {
  history: {
    boardState: BoardState;
    lastMove: string;
  }[];
  stepNumber: number;
  nextPlayer: Player;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
};

const GameInfo = ({
  history,
  stepNumber,
  nextPlayer,
  setStepNumber,
}: GameInfoProps) => {
  const winner = calculateWinner(history[stepNumber].boardState);

  const moveLabels = history.map((_, step) => {
    switch (step) {
      case 0:
        return "Start new game";
      case stepNumber:
        return `Current move (${history[step].lastMove})`;
      default:
        return `Go to move #${step} (${history[step].lastMove})`;
    }
  });

  return (
    <div className="game-info">
      <div>{winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`}</div>
      <ol>
        {history.map((_, move) => (
          <li key={move}>
            <button
              onClick={() => setStepNumber(move)}
              disabled={move === stepNumber}
            >
              {moveLabels[move]}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GameInfo;
