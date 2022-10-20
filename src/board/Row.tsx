import Cell from "./Cell";

interface RowProps {
    edgeClass: string;
    edgeValue: string;
    centreClass: string;
    centreData: {
        pos?: number
        label: string
    }[];
    onClick?: (index: number) => void;
}

const Row = ({
    edgeClass,
    edgeValue,
    centreClass,
    centreData,
    onClick
}: RowProps) => (
    <div className="board-row">
        <Cell className={edgeClass} value={edgeValue} />
        {centreData.map(({ pos, label }) => (
            <Cell
                key={pos}
                className={centreClass}
                value={label}
                onClick={() => onClick?.(pos ?? 0)}
            />
        ))}
        <Cell className={edgeClass} value={edgeValue} />
    </div>
);

export default Row;