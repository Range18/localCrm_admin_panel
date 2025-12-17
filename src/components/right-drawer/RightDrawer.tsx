import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import "./RightDrawer.css";
import type { ReactNode } from "react";

type Props = {
    open: boolean;
    title: string;
    onClose: () => void;

    children: ReactNode;
    footer?: ReactNode;
    widthPx?: number; // по умолчанию 420
};

export function RightDrawer({ open, title, onClose, children, footer, widthPx = 420 }: Props) {
    const titleId = useId();

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className="rdRoot" aria-hidden={false}>
            <button className="rdBackdrop" type="button" onClick={onClose} aria-label="Закрыть" />

            <aside
                className="rdPanel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                style={{ width: widthPx }}
            >
                <header className="rdHeader">
                    <h2 className="rdTitle" id={titleId}>
                        {title}
                    </h2>

                    <button className="rdClose" type="button" onClick={onClose} aria-label="Закрыть">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path
                                d="M5 5l10 10M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </header>

                <div className="rdBody">{children}</div>

                {footer ? <footer className="rdFooter">{footer}</footer> : null}
            </aside>
        </div>,
        document.body
    );
}
