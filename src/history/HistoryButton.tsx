import { ReactNode } from "react";

interface HistoryButtonProps {
  children: ReactNode;
  step: number;
  isCurrentStep: boolean;
  lastMove: string;
  onClick: () => void;
}

const HistoryButton = ({
  children,
  step,
  isCurrentStep,
  lastMove,
  onClick,
}: HistoryButtonProps) => (
  <button onClick={onClick} disabled={isCurrentStep}>
    {children ??
      (isCurrentStep
        ? `Current move (${lastMove})`
        : `Go to move #${step} (${lastMove})`)}
  </button>
);
export default HistoryButton;
