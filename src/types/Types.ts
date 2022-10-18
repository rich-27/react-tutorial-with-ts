export type Player = 'X' | 'O';
export type Move = Player | null;

export enum LabelClasses {
    Corner = 'corner-label',
    Column = 'column-label',
    Row = 'row-label',
};

export interface SquareProps {
    value: Move;
    onClick: () => void;
};

export interface BoardProps {
    squares: Move[];
    onClick: (square: number) => void;
}

export interface GameState {
    history: {
        squares: Move[];
        move: string;
    }[];
    stepNumber: number;
    xIsNext: boolean;
}