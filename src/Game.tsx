import { useState } from "react";
import Board from "./board/Board";

type Player = "X" | "O";
export type Move = Player | undefined;

export const cellColumns = ["a", "b", "c"] as const;
type CellColumn = typeof cellColumns[number];
export const cellRows = ["3", "2", "1"] as const;
type CellRow = typeof cellRows[number];

export type CellCoord = { row: CellRow; column: CellColumn };

type RowState = Record<CellColumn, Move>;
export type BoardState = Record<CellRow, RowState>;

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

  const nextPlayer = stepNumber % 2 === 0 ? "X" : "O";

  const calculateWinner = (boardState: BoardState) => {
    const lines = [
      ...cellRows.map((row) => cellColumns.map((column) => ({ row, column }))),
      ...cellColumns.map((column) => cellRows.map((row) => ({ row, column }))),
      // Generate diagonal lines
      cellRows.map((row, index) => ({ row, column: cellColumns[index] })),
      cellRows.map((row, index) => ({
        row,
        column: cellColumns.slice().reverse()[index],
      })),
    ];

    for (const line of lines) {
      const winner = boardState[line[0].row][line[0].column];
      if (
        winner &&
        line.every((coord) => boardState[coord.row][coord.column] === winner)
      ) {
        return winner as Player;
      }
    }

    return null;
  };

  const getMoveNotation = (
    player: Player,
    { row, column }: CellCoord,
    isWinner: boolean
  ) => `${player}${column}${row}${isWinner ? "#" : ""}`;

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
