import { Move } from "../game/Game";
import Cell from "./Cell";

interface RowProps {
  edgeClass: string;
  edgeLabel: string;
  centreClass: string;
  centreData: {
    value: Move | string;
    onClick?: () => void;
  }[];
}

const Row = ({ edgeClass, edgeLabel, centreClass, centreData }: RowProps) => (
  <div className="board-row">
    <Cell className={edgeClass} value={edgeLabel} />
    {centreData.map(({ value, onClick }, index) => (
      <Cell
        key={index}
        className={centreClass}
        value={value}
        onClick={onClick}
      />
    ))}
    <Cell className={edgeClass} value={edgeLabel} />
  </div>
);

export default Row;
