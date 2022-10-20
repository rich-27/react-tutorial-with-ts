import Row from "./Row";

const LabelRow = () => (
    <Row
        edgeClass={'label corner-label'}
        edgeLabel={''}
        centreClass={'label column-label'}
        centreData={['a', 'b', 'c'].map(label => ({ value: label }))}
    />
);

export default LabelRow;