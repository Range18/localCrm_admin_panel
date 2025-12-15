import { useMemo, useState } from "react";
import "./App.css";
import { AppShell } from "./layout/AppShell";

import type { ServiceCardData } from "./components/service-card/ServiceCard";
import {ServicesPage} from "./pages/service-page/ServicePage";
import type {SidebarKey} from "./components/sidebar-tab/types";

export default function App() {
    const [activeKey, setActiveKey] = useState<SidebarKey>("schedule");

    //TODO remove
    const services = useMemo<ServiceCardData[]>(
        () => [
            { id: "1", title: "Стрижка", description: "Классическая стрижка с мытьём и укладкой.", price: 1500, durationMin: 60, currency: "RUB" },
            { id: "2", title: "Окрашивание", description: "Подбор оттенка, окрашивание и уход.", price: 4500, durationMin: 120, currency: "RUB" },
            { id: "3", title: "Маникюр", description: "Обработка + покрытие (по желанию).", price: 2000, durationMin: 90, currency: "RUB" },
        ],
        []
    );

    return (
        <div className="app">
            <AppShell orgName="Моя организация" activeKey={activeKey} onChange={setActiveKey}>
                {activeKey === "services" ? (
                    <ServicesPage services={services} onEditService={(id) => console.log("edit", id)} />
                ) : (
                    <div className="page">
                        <div className="pageHeader">
                            <div>
                                <h1 className="pageTitle">Раздел: {activeKey}</h1>
                                <p className="pageSubtitle">Тут будет контент страницы</p>
                            </div>
                        </div>

                        <div className="card">
                            Контент выбранного раздела: <b>{activeKey}</b>
                        </div>
                    </div>
                )}
            </AppShell>
        </div>
    );
}
