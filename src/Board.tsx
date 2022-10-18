import React from 'react';
import { BoardProps, LabelClasses, SquareProps } from './types/Types';

class Square extends React.Component<SquareProps> {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component<BoardProps> {
    renderLabel(label: LabelClasses, text = '') {
        return (
            <button className={`label ${label as string}`}>
                {text}
            </button>
        );
    }

    renderSquare(i: number) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderLabelRow() {
        return (
            <div className="board-row">
                {this.renderLabel(LabelClasses.Corner)}
                {this.renderLabel(LabelClasses.Column, 'a')}
                {this.renderLabel(LabelClasses.Column, 'b')}
                {this.renderLabel(LabelClasses.Column, 'c')}
                {this.renderLabel(LabelClasses.Corner)}
            </div>
        );
    }

    renderBoardRow(value: string, pos: number[]) {
        return (
            <div className="board-row">
                {this.renderLabel(LabelClasses.Row, value)}
                {this.renderSquare(pos[0])}
                {this.renderSquare(pos[1])}
                {this.renderSquare(pos[2])}
                {this.renderLabel(LabelClasses.Row, value)}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderLabelRow()}
                {this.renderBoardRow('3', [0, 1, 2])}
                {this.renderBoardRow('2', [3, 4, 5])}
                {this.renderBoardRow('1', [6, 7, 8])}
                {this.renderLabelRow()}
            </div>
        );
    }
}

export default Board;