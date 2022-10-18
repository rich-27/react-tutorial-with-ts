export type Player = 'X' | 'O';
export type Move = Player | null;

export enum LabelClasses {
    Corner = 'corner-label',
    Column = 'column-label',
    Row = 'row-label',
};