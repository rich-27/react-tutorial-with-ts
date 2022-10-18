import { Move } from "../types/Types";

interface SquareProps {
    value: Move;
    onClick: () => void;
};

const Square = (props: SquareProps) => (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
);

export default Square;