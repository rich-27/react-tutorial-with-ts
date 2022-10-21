import HistoryButton from "./HistoryButton";

interface HistoryNavigatorProps {
  historyData: {
    step: number;
    lastMove: string;
    isCurrentStep: boolean;
    onClick: () => void;
  }[];
}

const HistoryNavigator = ({ historyData }: HistoryNavigatorProps) => (
  <ol>
    {historyData.map((stepData, index) => (
      <li key={index}>
        <HistoryButton {...stepData}>
          {index === 0 ? "Start new game" : undefined}
        </HistoryButton>
      </li>
    ))}
  </ol>
);

export default HistoryNavigator;
