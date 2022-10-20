import { LabelClasses } from "../types/Types";
import Row from "./Row";

const LabelRow = () => (
    <Row
        edgeClass={`label ${LabelClasses.Corner}`}
        edgeValue={''}
        centreClass={`label ${LabelClasses.Column}`}
        centreData={['a', 'b', 'c'].map(label => ({ label }))}
    />
);

export default LabelRow;