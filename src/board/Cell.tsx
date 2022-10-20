import { Move } from "../utils";

interface CellProps {
  className: string;
  onClick?: () => void;
  value: Move | string;
}

const Cell = ({ className, onClick = () => {}, value }: CellProps) => (
  <button className={className} onClick={onClick}>
    {value ?? ""}
  </button>
);

export default Cell;
