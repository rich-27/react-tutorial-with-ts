import { useState } from "react";
import Board from "../board/Board";
import HistoryNavigator from "../history/HistoryNavigator";

const players = ["X", "O"] as const;
export type Player = typeof players[number];
export type Move = Player | undefined;

export const cellColumns = ["a", "b", "c"] as const;
type CellColumn = typeof cellColumns[number];
export const cellRows = ["3", "2", "1"] as const;
type CellRow = typeof cellRows[number];
const maxMoves = cellColumns.length * cellRows.length;

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

  const getNextPlayer = (move: number) =>
    move < maxMoves ? players[move % players.length] : null;

  const [history, setHistory] = useState([
    {
      boardState: newBoardState(),
      lastMove: "",
      nextPlayer: getNextPlayer(0),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);

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
    const currentState = historySlice[historySlice.length - 1];

    let boardState = currentState.boardState;

    const player = currentState.nextPlayer;
    // If the square is already set or there's no valid nextPlayer, return
    if (boardState[row][column] || player === null) {
      return;
    }

    // If the game is already won, return
    if (calculateWinner(boardState)) {
      return;
    }

    // Else, make move and recheck for winner
    boardState = newBoardState(boardState);
    boardState[row][column] = player;

    const nextStep = stepNumber + 1;
    setHistory([
      ...historySlice,
      {
        boardState,
        lastMove: getMoveNotation(
          player,
          { row, column },
          calculateWinner(boardState) === player
        ),
        nextPlayer: getNextPlayer(nextStep),
      },
    ]);
    setStepNumber(nextStep);
  };

  const winner = calculateWinner(history[stepNumber].boardState);
  const nextPlayer = history[stepNumber].nextPlayer;

  return (
    <div className="game">
      <Board
        boardState={history[stepNumber].boardState}
        onClick={(coord) => handleBoardClick(coord)}
      />
      <div className="game-info">
        <div>
          {winner
            ? `Winner: ${winner}`
            : nextPlayer
            ? `Next player: ${nextPlayer}`
            : "Stalemate"}
        </div>
        <HistoryNavigator
          historyData={history.map(({ lastMove }, stepIndex) => ({
            step: stepIndex,
            lastMove,
            isCurrentStep: stepIndex === stepNumber,
            onClick: () => setStepNumber(stepIndex),
          }))}
        />
      </div>
    </div>
  );
};

export default Game;
