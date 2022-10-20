import { Move } from "../types/Types";
import Row from "./Row";

interface BoardRowProps {
    value: string;
    pos: number[];
    squares: Move[];
    onClick: (index: number) => void;
}

const BoardRow = ({
    value,
    pos,
    squares,
    onClick
}: BoardRowProps) => (
    <Row
        edgeClass={'label row-label'}
        edgeValue={value}
        centreClass={'square'}
        centreData={pos.map(pos => ({
            pos,
            label: squares[pos] ?? '',
        }))}
        onClick={onClick}
    />
);

export default BoardRow;