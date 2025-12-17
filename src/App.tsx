import {useState} from "react";
import "./App.css";
import "./pages/PageStyle.css"
import {AppShell} from "./layout/AppShell";

import type {SidebarKey} from "./components/sidebar-tab/types";
import {useClients} from "./hooks/clients/useClients";
import {useMasters} from "./hooks/masters/useMasters.ts";
import {useServices} from "./hooks/services/useServices.ts";
import {ServicesPage} from "./pages/services-page/ServicesPage.tsx";
import {MastersPage} from "./pages/masters-page/MasterPage.tsx";
import {ClientsPage} from "./pages/clients-page/ClientsPage.tsx";
import {SchedulePage} from "./pages/SchedulePage.tsx";
import {useAppointments} from "./hooks/appointments/useAppointments.ts";

export default function App() {
    const [activeKey, setActiveKey] = useState<SidebarKey>("schedule");
    const appointmentsState = useAppointments();
    const servicesResponse = useServices();
    const clientsState = useClients();
    const mastersResponse = useMasters();

    return (
        <div className="app">
            <AppShell orgName="Моя организация" activeKey={activeKey} onChange={setActiveKey}>
                {activeKey === "schedule" ? (
                        <SchedulePage masters={mastersResponse.data.map(master => {
                            return {id: master.id, name: `${master.firstName} ${master.lastName}`}
                        })} appointments={appointmentsState.data}/>
                    ) :
                    activeKey === "services" ? (
                        <ServicesPage
                            services={servicesResponse.data}
                            onSave={(updated) => console.log("save to api", updated)}
                            onDelete={(id) => console.log("delete", id)}
                        />
                    ) : activeKey === "masters" ? (
                        <MastersPage
                            masters={mastersResponse.data}
                            onSave={(updated) => console.log("save to api", updated)}
                            onDelete={(id) => console.log("delete", id)}
                        />
                    ) : activeKey === "clients" ? (
                        <ClientsPage
                            clients={clientsState.data}
                            onSave={(updated) => console.log("save to api", updated)}
                            onDelete={clientsState.remove}
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
