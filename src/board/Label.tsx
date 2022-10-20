import { LabelClasses } from "../types/Types";
import Cell from "./Cell";

interface LabelProps {
    class: LabelClasses;
    text?: string;
}

const Label = (props: LabelProps) => (
    <Cell 
        className={`label ${props.class}`}
        value={props.text ?? ''}
    />
);

export default Label;