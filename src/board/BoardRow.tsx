import Row from "./Row";

interface BoardRowProps {
    edgeValue: string;
    centreData: {
        label: string
        onClick?: () => void;
    }[];
}

const BoardRow = ({ edgeValue, centreData }: BoardRowProps) => (
    <Row
        edgeClass={'label row-label'}
        edgeValue={edgeValue}
        centreClass={'square'}
        centreData={centreData}
    />
);

export default BoardRow;