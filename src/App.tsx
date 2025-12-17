import {useState} from "react";
import "./App.css";
import {AppShell} from "./layout/AppShell";

import type {ServiceCardData} from "./components/service-card/ServiceCard";
import {ServiceCard} from "./components/service-card/ServiceCard";

import type {MasterCardData} from "./components/master-card/MasterCard";
import {MasterCard} from "./components/master-card/MasterCard";

import type {SidebarKey} from "./components/sidebar-tab/types";
import {TilePage} from "./pages/tile-page/TilePage";
import {ClientCard} from "./components/client-card/ClientCard";
import type {ClientCardData} from "./components/client-card/types";
import {useClients} from "./hooks/clients/useClients";
import {useMasters} from "./hooks/masters/useMasters.ts";
import {useServices} from "./hooks/services/useServices.ts";

export default function App() {
    const [activeKey, setActiveKey] = useState<SidebarKey>("schedule");
    const servicesResponse = useServices();
    const clientsResponse = useClients();
    const mastersResponse = useMasters();

    return (
        <div className="app">
            <AppShell orgName="Моя организация" activeKey={activeKey} onChange={setActiveKey}>
                {activeKey === "services" ? (
                    <TilePage<ServiceCardData>
                        title="Услуги"
                        subtitle="Цена, длительность, описание"
                        items={servicesResponse.data}
                        emptyText="Добавь первую услугу"
                        ariaLabel="Список услуг"
                        renderItem={(s) => <ServiceCard data={s} onEdit={(id) => console.log("edit service", id)}/>}
                    />
                ) : activeKey === "masters" ? (
                    <TilePage<MasterCardData>
                        title="Мастера"
                        subtitle="Список специалистов вашей организации"
                        items={mastersResponse.data}
                        emptyText="Добавь первого мастера"
                        ariaLabel="Список мастеров"
                        renderItem={(m) => <MasterCard data={m} onEdit={(id) => console.log("edit master", id)}/>}
                    />
                ) : activeKey === "clients" ? (
                    <TilePage<ClientCardData>
                        title="Клиенты"
                        subtitle="Контакты и источник (Telegram/WhatsApp)"
                        items={clientsResponse.data}
                        emptyText="Добавь первого клиента"
                        ariaLabel="Список клиентов"
                        renderItem={(c) => <ClientCard data={c} onEdit={(id) => console.log("edit client", id)}/>}
                    />
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
