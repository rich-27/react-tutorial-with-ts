import { useState } from "react";
import Board from "./board/Board";
import {
  BoardState,
  calculateWinner,
  cellColumns,
  CellCoord,
  cellRows,
  getMoveNotation,
  Player,
  RowState,
} from "./utils";

const Game = () => {
  const newBoardState = (boardState?: BoardState) =>
    cellRows.reduce(
      (rowMap, row) => ({
        ...rowMap,
        [row]: cellColumns.reduce(
          (columnMap, column) => ({
            ...columnMap,
            [column]: boardState?.[row]?.[column],
          }),
          {} as RowState
        ),
      }),
      {} as BoardState
    );

  const [history, setHistory] = useState([
    {
      boardState: newBoardState(),
      lastMove: "",
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);

  const nextPlayer: Player = stepNumber % 2 === 0 ? "X" : "O";

  const handleBoardClick = ({ row, column }: CellCoord) => {
    const historySlice = history.slice(0, stepNumber + 1);

    let boardState = historySlice[historySlice.length - 1].boardState;

    // If the square is already set, return
    if (boardState[row][column]) {
      return;
    }

    // If the game is already won, return
    let winner = calculateWinner(boardState);
    if (winner) {
      return;
    }

    // Else, make move and recheck for winner
    boardState = newBoardState(boardState);
    boardState[row][column] = nextPlayer;
    winner = calculateWinner(boardState);

    setHistory([
      ...historySlice,
      {
        boardState,
        lastMove: getMoveNotation(
          nextPlayer,
          { row, column },
          winner === nextPlayer
        ),
      },
    ]);
    setStepNumber(historySlice.length);
  };

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
    <div className="game">
      <div className="game-board">
        <Board
          boardState={history[stepNumber].boardState}
          onClick={(coord) => handleBoardClick(coord)}
        />
      </div>
      <div className="game-info">
        <div>{winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`}</div>
        <ol>
          {history.map((_, move) => (
            <li key={move}>
              <button
                onClick={() => setStepNumber(move)}
                disabled={move === stepNumber}
              >
                {moveLabels[move].slice()}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Game;
