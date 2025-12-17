import {useState} from "react";
import "./App.css";
import "./pages/services-page/ServicesPage.css"
import {AppShell} from "./layout/AppShell";
import type {MasterCardData} from "./components/master-card/MasterCard";
import {MasterCard} from "./components/master-card/MasterCard";

import type {SidebarKey} from "./components/sidebar-tab/types";
import {TilePage} from "./pages/tile-page/TilePage";
import {ClientCard} from "./components/client-card/ClientCard";
import type {ClientCardData} from "./components/client-card/types";
import {useClients} from "./hooks/clients/useClients";
import {useMasters} from "./hooks/masters/useMasters.ts";
import {useServices} from "./hooks/services/useServices.ts";
import {ServicesPage} from "./pages/services-page/ServicesPage.tsx";

export default function App() {
    const [activeKey, setActiveKey] = useState<SidebarKey>("schedule");
    const servicesResponse = useServices();
    const clientsResponse = useClients();
    const mastersResponse = useMasters();

    return (
        <div className="app">
            <AppShell orgName="Моя организация" activeKey={activeKey} onChange={setActiveKey}>
                {activeKey === "services" ? (
                    <ServicesPage
                        services={servicesResponse.data}
                        onSave={(updated) => console.log("save to api", updated)}
                        onDelete={(id) => console.log("delete", id)}
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
