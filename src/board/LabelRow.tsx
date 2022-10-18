import { LabelClasses } from "../types/Types";
import Label from "./Label";

const LabelRow = () => {
    const labels = ['a', 'b', 'c'];

    return (
        <div className="board-row">
            <Label class={LabelClasses.Corner} />
            {labels.map(label => (
                <Label
                    key={label}
                    class={LabelClasses.Column}
                    text={label}
                />
            ))}
            <Label class={LabelClasses.Corner} />
        </div>
    );
}

export default LabelRow;