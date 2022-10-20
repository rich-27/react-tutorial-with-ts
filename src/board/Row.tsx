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

const Row = (props: RowProps) => (
    <div className="board-row">
        <Cell className={props.edgeClass} value={props.edgeValue} />
        {props.centreData.map(({ pos, label }) => (
            <Cell
                key={pos}
                className={props.centreClass}
                value={label}
                onClick={() => props.onClick?.(pos ?? 0)}
            />
        ))}
        <Cell className={props.edgeClass} value={props.edgeValue} />
    </div>
);

export default Row;