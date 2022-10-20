import { Move } from "../types/Types";
import Row from "./Row";

interface BoardRowProps {
    value: string;
    pos: number[];
    squares: Move[];
    onClick: (index: number) => void;
}

const BoardRow = (props: BoardRowProps) => (
    <Row
        edgeClass={'label row-label'}
        edgeValue={props.value}
        centreClass={'square'}
        centreData={props.pos.map(pos => ({
            pos,
            label: props.squares[pos] ?? '',
        }))}
        onClick={props.onClick}
    />
);

export default BoardRow;