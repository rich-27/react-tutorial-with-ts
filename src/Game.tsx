import { useState } from "react";
import Board from "./board/Board";
import GameInfo from "./GameInfo";
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

  return (
    <div className="game">
      <div className="game-board">
        <Board
          boardState={history[stepNumber].boardState}
          onClick={(coord) => handleBoardClick(coord)}
        />
      </div>

      <GameInfo
        history={history}
        stepNumber={stepNumber}
        nextPlayer={nextPlayer}
        setStepNumber={setStepNumber}
      />
    </div>
  );
};

export default Game;
