import { BoardState, cellColumns, CellCoord, cellRows } from "../game/Game";
import BoardRow from "./BoardRow";
import LabelRow from "./LabelRow";

interface BoardProps {
  boardState: BoardState;
  onClick: (coord: CellCoord) => void;
}

const Board = ({ boardState, onClick }: BoardProps) => (
  <div className="game-board">
    <LabelRow />
    {cellRows.map((row) => (
      <BoardRow
        key={row}
        edgeLabel={row}
        centreData={cellColumns.map((column) => ({
          value: boardState[row][column],
          onClick: () => onClick({ row, column }),
        }))}
      />
    ))}
    <LabelRow />
  </div>
);

export default Board;
