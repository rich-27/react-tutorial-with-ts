import React, { useState } from 'react';
import Board from './Board';
import { Move, Player } from './types/Types';

interface MoveRecord {
    squares: Move[];
    move: string;
};

const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
        move: '',
    }] as MoveRecord[]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const calculateWinner = (squares: Move[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const line of lines) {
            const winner = squares[line[0]];
            if (line.every(piece => squares[piece] === winner)) {
                return winner as Player;
            }
        };

        return null;
    }

    const getNextPlayer: () => Player = () => (
        (stepNumber % 2) === 0 ? "X" : "O"
    );

    const handleBoardClick = (i: number) => {
        const historySlice = history.slice(0, stepNumber + 1);
        const squares = historySlice[
            historySlice.length - 1
        ].squares.slice();
        if (squares[i] || calculateWinner(squares)) { return; }
        squares[i] = getNextPlayer();
        const winning = calculateWinner(squares) === squares[i];
        setHistory([...historySlice, {
            squares,
            move: squares[i] +
                'abc'[i % 3] +
                (3 - Math.floor(i / 3)) +
                (winning ? '#' : ''),
        }]);
        setStepNumber(historySlice.length);
    }

    const jumpTo = (step: number) => { };

    const winner = calculateWinner(
        history[stepNumber].squares
    );

    const status = winner ?
        `Winner: ${winner}` :
        `Next player: ${getNextPlayer()}`;

    const moveLabels = history.map((_, step) => {
        switch (step) {
            case 0:
                return 'Start new game';
            case stepNumber:
                return `Current move (${history[step].move})`;
            default:
                return `Go to move #${step} (${history[step].move})`;
        }
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={history[stepNumber].squares}
                    onClick={i => handleBoardClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>
                    {history.map((_, move) => {
                        return (
                            <li key={move}>
                                <button
                                    onClick={() => setStepNumber(move)}
                                    disabled={move === stepNumber}
                                >
                                    {moveLabels[move].slice()}
                                </button>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
}

export default Game;