import { BoardState, cellColumns, CellCoord, cellRows } from "../Game";
import BoardRow from "./BoardRow";
import LabelRow from "./LabelRow";

interface BoardProps {
    boardState: BoardState;
    onClick: (coord: CellCoord) => void;
}

const Board = ({ boardState, onClick }: BoardProps) => (
    <div>
        <LabelRow />
        {cellRows.map(row => (
            <BoardRow
                key={row}
                label={row}
                centreData={cellColumns.map(column => ({
                    value: boardState[row][column] ?? '',
                    onClick: () => onClick({ row, column })
                }))}
            />
        ))}
        <LabelRow />
    </div>
);

export default Board;