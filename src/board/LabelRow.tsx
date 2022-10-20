import Row from "./Row";

const LabelRow = () => (
    <Row
        edgeClass={'label corner-label'}
        edgeValue={''}
        centreClass={'label column-label'}
        centreData={['a', 'b', 'c'].map(label => ({ label }))}
    />
);

export default LabelRow;