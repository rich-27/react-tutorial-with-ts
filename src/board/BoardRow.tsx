import { LabelClasses, Move } from "../types/Types";
import Label from "./Label";
import Square from "./Square";

interface BoardRowProps {
    value: string;
    pos: number[];
    squares: Move[];
    onClick: (index: number) => void;
}

const BoardRow = (props: BoardRowProps) => (
    <div className="board-row">
        <Label class={LabelClasses.Row} text={props.value} />
        {props.pos.map(squareNum => (
            <Square
                key={squareNum}
                value={props.squares[squareNum]}
                onClick={() => props.onClick(squareNum)}
            />
        ))}
        <Label class={LabelClasses.Row} text={props.value} />
    </div>
);

export default BoardRow;