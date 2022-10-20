export type Player = "X" | "O";
export type Move = Player | undefined;

export const cellColumns = ["a", "b", "c"] as const;
type CellColumn = typeof cellColumns[number];
export const cellRows = ["3", "2", "1"] as const;
type CellRow = typeof cellRows[number];

export type CellCoord = { row: CellRow; column: CellColumn };

export type RowState = Record<CellColumn, Move>;
export type BoardState = Record<CellRow, RowState>;

export const calculateWinner = (boardState: BoardState) => {
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
};

export const getMoveNotation = (
  player: Player,
  { row, column }: CellCoord,
  isWinner: boolean
) => `${player}${column}${row}${isWinner ? "#" : ""}`;
