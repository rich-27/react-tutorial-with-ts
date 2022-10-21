import { Player } from "../game/Game";

interface StatusDisplayProps {
  winner: Player | null;
  nextPlayer: Player | null;
}

const StatusDisplay = ({ winner, nextPlayer }: StatusDisplayProps) => (
  <div>
    {winner
      ? `Winner: ${winner}`
      : nextPlayer
      ? `Next player: ${nextPlayer}`
      : "Stalemate"}
  </div>
);

export default StatusDisplay;
