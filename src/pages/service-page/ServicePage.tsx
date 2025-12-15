import type {ServiceCardData} from "../../components/service-card/ServiceCard";
import {ServiceGrid} from "../../components/service-grid/ServiceGrid";

type Props = {
    services: ServiceCardData[];
    onEditService?: (id: string) => void;
};

export function ServicesPage({ services, onEditService }: Props) {
    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Услуги</h1>
                    <p className="pageSubtitle">Управляй услугами: цена, длительность, описание</p>
                </div>
            </div>

            <ServiceGrid
                items={services}
                onEdit={onEditService}
                emptyText="Добавь первую услугу"
            />
        </div>
    );
}
