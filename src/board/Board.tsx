import { Move } from "../types/Types";
import BoardRow from "./BoardRow";
import LabelRow from "./LabelRow";

interface BoardProps {
    squares: Move[];
    onClick: (square: number) => void;
}

const Board = ({ squares, onClick }: BoardProps) => {
    const boardRowData = [
        { value: '3', pos: [0, 1, 2] },
        { value: '2', pos: [3, 4, 5] },
        { value: '1', pos: [6, 7, 8] }
    ];

    return (
        <div>
            <LabelRow />
            {boardRowData.map(({ value, pos }) => (
                <BoardRow
                    key={value}
                    edgeValue={value}
                    centreData={pos.map(pos => ({
                        pos,
                        label: squares[pos] ?? '',
                        onClick: () => onClick(pos)
                    }))}
                />
            ))}
            <LabelRow />
        </div>
    );
}

export default Board;