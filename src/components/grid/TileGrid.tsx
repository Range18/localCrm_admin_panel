import "./TileGrid.css";
import type { ReactNode } from "react";

type Props<T> = {
    items: T[];
    renderItem: (item: T) => ReactNode;
    emptyText?: string;
    ariaLabel?: string;
};

export function TileGrid<T>({
                                items,
                                renderItem,
                                emptyText = "Пока пусто",
                                ariaLabel = "Список",
                            }: Props<T>) {
    if (!items.length) {
        return <div className="tileGridEmpty">{emptyText}</div>;
    }

    return (
        <div className="tileGrid" role="list" aria-label={ariaLabel}>
            {items.map((item, idx) => (
                <div key={getKey(item, idx)} role="listitem" className="tileGridItem">
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}

function getKey(item: unknown, idx: number) {
    // если у объекта есть id — используем его
    if (item && typeof item === "object" && "id" in (item as any)) {
        const v = (item as any).id;
        if (typeof v === "string" || typeof v === "number") return String(v);
    }
    return String(idx);
}
