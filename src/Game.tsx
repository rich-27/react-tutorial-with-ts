import React from 'react';
import Board from './Board';
import { GameState, Move, Player } from './types/Types';

export default class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                move: '',
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    calculateWinner(squares: Move[]) {
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

    getNextPlayer(): Player {
        return (this.state.stepNumber % 2) === 0 ? "X" : "O"
    }

    handleBoardClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const squares = history[history.length - 1].squares.slice();
        if (squares[i] || this.calculateWinner(squares)) { return; }
        squares[i] = this.getNextPlayer();
        const winning = this.calculateWinner(squares) === squares[i];
        this.setState({
            history: [...history, {
                squares,
                move: squares[i] +
                    'abc'[i % 3] +
                    (3 - Math.floor(i / 3)) +
                    (winning ? '#' : ''),
            }],
            stepNumber: history.length,
        });
    }

    jumpTo(step: number) {
        this.setState({ stepNumber: step });
    }

    render() {
        const history = this.state.history;
        const currentStep = this.state.stepNumber;
        const winner = this.calculateWinner(
            history[currentStep].squares
        );
        const status = winner ?
            `Winner: ${winner}` :
            `Next player: ${this.getNextPlayer()}`;
        const moveLabels = history.map((_, step) => {
            switch (step) {
                case 0:
                    return 'Start new game';
                case currentStep:
                    return `Current move (${history[step].move})`;
                default:
                    return `Go to move #${step} (${history[step].move})`;
            }
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={history[currentStep].squares}
                        onClick={i => this.handleBoardClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>
                        {history.map((_, move) => {
                            return (
                                <li key={move}>
                                    <button
                                        onClick={() => this.jumpTo(move)}
                                        disabled={move === currentStep}
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
}