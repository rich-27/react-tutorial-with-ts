import { Move } from "../types/Types";
import BoardRow from "./BoardRow";
import LabelRow from "./LabelRow";

interface BoardProps {
    squares: Move[];
    onClick: (square: number) => void;
}

const Board = ({ squares, onClick }: BoardProps) => {
    const boardRowData = [
        { label: '3', pos: [0, 1, 2] },
        { label: '2', pos: [3, 4, 5] },
        { label: '1', pos: [6, 7, 8] }
    ];

    return (
        <div>
            <LabelRow />
            {boardRowData.map(({ label, pos }) => (
                <BoardRow
                    key={label}
                    edgeLabel={label}
                    centreData={pos.map(pos => ({
                        value: squares[pos],
                        onClick: () => onClick(pos)
                    }))}
                />
            ))}
            <LabelRow />
        </div>
    );
}

export default Board;