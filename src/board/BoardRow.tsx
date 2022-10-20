import { LabelClasses, Move } from "../types/Types";
import Cell from "./Cell";

interface BoardRowProps {
    value: string;
    pos: number[];
    squares: Move[];
    onClick: (index: number) => void;
}

const BoardRow = (props: BoardRowProps) => {
    const edgeClass = `label ${LabelClasses.Row}`;

    return (
        <div className="board-row">
            <Cell className={edgeClass} value={props.value} />
            {props.pos.map(squareNum => (
                <Cell
                    key={squareNum}
                    className={'square'}
                    value={props.squares[squareNum] ?? ''}
                    onClick={() => props.onClick(squareNum)}
                />
            ))}
            <Cell className={edgeClass} value={props.value} />
        </div>
    );
}

export default BoardRow;