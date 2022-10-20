import { Move } from "../Game";
import Row from "./Row";

interface BoardRowProps {
  edgeLabel: string;
  centreData: {
    value: Move;
    onClick: () => void;
  }[];
}

const BoardRow = ({ edgeLabel, centreData }: BoardRowProps) => (
  <Row
    edgeClass={"label row-label"}
    edgeLabel={edgeLabel}
    centreClass={"square"}
    centreData={centreData}
  />
);

export default BoardRow;
