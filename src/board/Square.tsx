import { Move } from "../types/Types";
import Cell from "./Cell";

interface SquareProps {
    value: Move;
    onClick: () => void;
};

const Square = (props: SquareProps) => (
    <Cell
        className='square'
        onClick={props.onClick}
        value={props.value ?? ''}
    />
);

export default Square;