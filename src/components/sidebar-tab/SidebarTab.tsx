import "./SidebarTab.css";
import type {Props} from "./types";

export function SidebarTab({ id, label, active, onClick, icon }: Props) {
    return (
        <button
            type="button"
            className={`sbTab ${active ? "isActive" : ""}`}
            onClick={() => onClick?.(id)}
            aria-current={active ? "page" : undefined}
        >
      <span className="sbTabIcon" aria-hidden="true">
        {icon ?? <IconPlaceholder />}
      </span>
            <span className="sbTabLabel">{label}</span>
        </button>
    );
}

function IconPlaceholder() {
    // Заготовка под иконку (замени на свою)
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6.5 10h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}
