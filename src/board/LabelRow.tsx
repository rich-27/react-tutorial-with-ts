import { LabelClasses } from "../types/Types";
import Cell from "./Cell";

const LabelRow = () => {
    const labels = ['a', 'b', 'c'];
    const cornerClass = `label ${LabelClasses.Corner}`;

    return (
        <div className="board-row">
            <Cell className={cornerClass} />
            {labels.map(label => (
                <Cell
                    key={label}
                    className={`label ${LabelClasses.Column}`}
                    value={label}
                />
            ))}
            <Cell className={cornerClass} />
        </div>
    );
}

export default LabelRow;