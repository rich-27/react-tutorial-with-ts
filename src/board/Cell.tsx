interface CellProps {
    className: string;
    onClick?: () => void;
    value?: string;
}

const Cell = ({ className, onClick = () => {}, value }: CellProps) => (
    <button className={className} onClick={onClick}>
        {value ?? ''}
    </button>
);

export default Cell;