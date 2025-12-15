import "./ServiceGrid.css";
import { ServiceCard, type ServiceCardData } from "../service-card/ServiceCard";

type Props = {
    items: ServiceCardData[];
    onEdit?: (id: string) => void;
    emptyText?: string;
};

export function ServiceGrid({ items, onEdit, emptyText = "Услуг пока нет" }: Props) {
    if (!items.length) {
        return <div className="svcGridEmpty">{emptyText}</div>;
    }

    return (
        <div className="svcGrid" role="list" aria-label="Список услуг">
            {items.map((s) => (
                <div key={s.id} role="listitem" className="svcGridItem">
                    <ServiceCard data={s} onEdit={onEdit} />
                </div>
            ))}
        </div>
    );
}
