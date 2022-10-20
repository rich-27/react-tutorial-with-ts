import { useState } from "react";
import Board from "./board/Board";

type Player = 'X' | 'O';
export type Move = Player | null;

interface GameState {
    boardState: Move[];
    lastMove: string;
};

const Game = () => {
    const [history, setHistory] = useState([{
        boardState: Array(9).fill(null),
        lastMove: '',
    }] as GameState[]);
    const [stepNumber, setStepNumber] = useState(0);

    const nextPlayer = (stepNumber % 2) === 0 ? "X" : "O";

    const calculateWinner = (squares: Move[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const line of lines) {
            const winner = squares[line[0]];
            if (winner && line.every(piece => squares[piece] === winner)) {
                return winner as Player;
            }
        };

        return null;
    }

    const getMoveNotation: (
        player: Player,
        coord: { column: string; row: string; },
        isWinner: boolean
    ) => string = (player, { column, row }, isWinner) => [
        player,
        column,
        row,
        (isWinner ? '#' : '')
    ].join('');

    const handleBoardClick = (squareNum: number) => {
        const historySlice = history.slice(0, stepNumber + 1);

        const squares = historySlice[
            historySlice.length - 1
        ].boardState.slice();

        // If the square is already set, return
        if (squares[squareNum]) { return; }

        // If the game is already won, return
        let winner = calculateWinner(squares);
        if (winner) { return; }

        // Else, make move and recheck for winner
        squares[squareNum] = nextPlayer;
        winner = calculateWinner(squares);

        setHistory([...historySlice, {
            boardState: squares,
            lastMove: getMoveNotation(
                nextPlayer,
                {
                    column: 'abc'[squareNum % 3],
                    row: (3 - Math.floor(squareNum / 3)).toString(),
                },
                winner === nextPlayer
            ),
        }]);
        setStepNumber(historySlice.length);
    }

    const winner = calculateWinner(
        history[stepNumber].boardState
    );

    const moveLabels = history.map((_, step) => {
        switch (step) {
            case 0:
                return 'Start new game';
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
                    squares={history[stepNumber].boardState}
                    onClick={squareNum => handleBoardClick(squareNum)}
                />
            </div>
            <div className="game-info">
                <div>
                    {winner ?
                        `Winner: ${winner}` :
                        `Next player: ${nextPlayer}`}
                </div>
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
}

export default Game;