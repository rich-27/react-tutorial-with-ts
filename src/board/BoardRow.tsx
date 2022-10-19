import Row from "./Row";

interface BoardRowProps {
    label: string;
    centreData: {
        value: string,
        onClick?: () => void,
    }[]
}

const BoardRow = ({ label, centreData }: BoardRowProps) => (
    <Row
        edgeClass={'label row-label'}
        edgeValue={label}
        centreClass={'square'}
        centreData={centreData}
    />
);

export default BoardRow;