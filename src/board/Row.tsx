import Cell from "./Cell";

interface RowProps {
    edgeClass: string;
    edgeValue: string;
    centreClass: string;
    centreData: {
        value: string,
        onClick?: (() => void)
    }[];
}

const Row = ({ edgeClass, edgeValue, centreClass, centreData }: RowProps) => (
    <div className="board-row">
        <Cell className={edgeClass} value={edgeValue} />
        {centreData.map(({ value, onClick }, index) => (
            <Cell
                key={index}
                className={centreClass}
                value={value}
                onClick={onClick}
            />
        ))}
        <Cell className={edgeClass} value={edgeValue} />
    </div>
);

export default Row;