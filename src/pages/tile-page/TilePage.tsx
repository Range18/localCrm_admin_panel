import "./TilePage.css";
import { TileGrid } from "../../components/grid/TileGrid";
import type { ReactNode } from "react";
import {FloatingAddButton} from "../../components/fab/FloatingAddButton";

type Props<T> = {
    title: string;
    subtitle?: string;

    items: T[];
    renderItem: (item: T) => ReactNode;

    emptyText?: string;
    ariaLabel?: string;

    rightSlot?: ReactNode; // кнопка "Добавить" и т.п.

    fabOnClick?: () => void;        // ✅
    fabAriaLabel?: string;          // ✅
};

export function TilePage<T>({
                                title,
                                subtitle,
                                items,
                                renderItem,
                                emptyText,
                                ariaLabel,
                                rightSlot,
                                fabOnClick,
                                fabAriaLabel,
                            }: Props<T>) {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">{title}</h1>
                    {subtitle ? <p className="pageSubtitle">{subtitle}</p> : null}
                </div>

                {rightSlot ? <div className="tilePageRight">{rightSlot}</div> : null}
            </div>

            <TileGrid<T>
                items={items}
                renderItem={renderItem}
                emptyText={emptyText}
                ariaLabel={ariaLabel}
            />
            {fabOnClick ? <FloatingAddButton onClick={fabOnClick} ariaLabel={fabAriaLabel ?? "Создать"} /> : null}
        </div>
    );
}
