import React from 'react';
import { LabelClasses, Move } from './types/Types';

interface SquareProps {
    value: Move;
    onClick: () => void;
};

const Square = (props: SquareProps) => (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
);

interface BoardProps {
    squares: Move[];
    onClick: (square: number) => void;
}

interface LabelProps {
    class: LabelClasses;
    text?: string;
}

const Label = (props: LabelProps) => (
    <button className={`label ${props.class}`}>
        {props.text ?? ''}
    </button>
);

const LabelRow = () => {
    const labels = ['a', 'b', 'c'];

    return (
        <div className="board-row">
            <Label class={LabelClasses.Corner} />
            {labels.map(label => (
                <Label
                    key={label}
                    class={LabelClasses.Column}
                    text={label}
                />
            ))}
            <Label class={LabelClasses.Corner} />
        </div>
    );
}

interface BoardRowProps {
    value: string;
    pos: number[];
    squares: Move[];
    onClick: (index: number) => void;
}

const BoardRow = (props: BoardRowProps) => (
    <div className="board-row">
        <Label class={LabelClasses.Row} text={props.value} />
        {props.pos.map(squareNum => (
            <Square
                key={squareNum}
                value={props.squares[squareNum]}
                onClick={() => props.onClick(squareNum)}
            />
        ))}
        <Label class={LabelClasses.Row} text={props.value} />
    </div>
);

const Board = (props: BoardProps) => {
    const boardRowData = [
        { value: '3', pos: [0, 1, 2] },
        { value: '2', pos: [3, 4, 5] },
        { value: '1', pos: [6, 7, 8] }
    ];

    return (
        <div>
            <LabelRow />
            {boardRowData.map(({ value, pos }) => (
                <BoardRow
                    key={value}
                    value={value}
                    pos={pos}
                    squares={props.squares}
                    onClick={props.onClick}
                />
            ))}
            <LabelRow />
        </div>
    );
}

export default Board;