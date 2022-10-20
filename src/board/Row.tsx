import Cell from "./Cell";

interface RowProps {
    edgeClass: string;
    edgeValue: string;
    centreClass: string;
    centreData: {
        label: string
        onClick?: () => void;
    }[];
}

const Row = ({ edgeClass, edgeValue, centreClass, centreData }: RowProps) => (
    <div className="board-row">
        <Cell className={edgeClass} value={edgeValue} />
        {centreData.map(({ label, onClick }, index) => (
            <Cell
                key={index}
                className={centreClass}
                value={label}
                onClick={onClick}
            />
        ))}
        <Cell className={edgeClass} value={edgeValue} />
    </div>
);

export default Row;