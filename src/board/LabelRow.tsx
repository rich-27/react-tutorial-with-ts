import { cellColumns } from "../Game";
import Row from "./Row";

const LabelRow = () => (
    <Row
        edgeClass={'label corner-label'}
        edgeLabel={''}
        centreClass={'label column-label'}
        centreData={cellColumns.map(label => ({ value: label }))}
    />
);

export default LabelRow;