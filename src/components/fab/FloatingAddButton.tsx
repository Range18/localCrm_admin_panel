import "./FloatingAddButton.css";

type Props = {
    onClick: () => void;
    ariaLabel?: string;
};

export function FloatingAddButton({ onClick, ariaLabel = "Создать" }: Props) {
    return (
        <button type="button" className="fabAdd" onClick={onClick} aria-label={ariaLabel} title={ariaLabel}>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </button>
    );
}
