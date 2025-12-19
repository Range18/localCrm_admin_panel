import { useState } from "react";
import "./App.css";
import "./pages/PageStyle.css";
import { AppShell } from "./layout/AppShell";

import type { SidebarKey } from "./components/sidebar-tab/types";

import { useClients } from "./hooks/clients/useClients";
import { useMasters } from "./hooks/masters/useMasters";
import { useServices } from "./hooks/services/useServices";
import { useAppointments } from "./hooks/appointments/useAppointments";

import { ServicesPage } from "./pages/services-page/ServicesPage";
import { MastersPage } from "./pages/masters-page/MasterPage";
import { ClientsPage } from "./pages/clients-page/ClientsPage";
import { SchedulePage } from "./pages/SchedulePage";

// ✅ admin create api
import {createAppointmentFromUi} from "./api/appointments/appointments";
import {createMaster, createServiceFromUi} from "./api/masters/masters";
import {createClient} from "./api/clients/clients"; // если у тебя тоже admin-роут — скажи, заменю

export default function App() {
    const [activeKey, setActiveKey] = useState<SidebarKey>("schedule");

    const appointmentsState = useAppointments();
    const servicesState = useServices();
    const clientsState = useClients();
    const mastersState = useMasters();

    return (
        <div className="app">
            <AppShell orgName="Nelly Eva" activeKey={activeKey} onChange={setActiveKey}>
                {activeKey === "schedule" ? (
                    <SchedulePage
                        masters={mastersState.data.map((m) => ({
                            id: Number(m.id),
                            name: `${m.firstName} ${m.lastName}`,
                        }))}
                        services={servicesState.data.map((s) => ({
                            id: Number(s.id),
                            title: s.title,
                        }))}
                        clients={clientsState.data.map((c) => ({
                            id: Number(c.id),
                            name: `${c.firstName} ${c.lastName}`,
                        }))}
                        appointments={appointmentsState.data}
                        onCreate={async (dto) => {
                            await createAppointmentFromUi({
                                date: dto.date,
                                startHHMM: dto.start_time,
                                finishHHMM: dto.finish_time,
                                price: dto.price,
                                client_id: dto.client_id,
                                service_id: dto.service_id,
                                master_id: dto.master_id,
                            });

                            // если хочешь сразу обновлять календарь:
                            // await appointmentsState.refetch?.()
                        }}
                    />
                ) : activeKey === "services" ? (
                    <ServicesPage
                        services={servicesState.data}
                        onCreate={async (svc) => {
                            await createServiceFromUi({
                                name: svc.title,
                                description: svc.description,
                                price: svc.price,
                                durationHHMM: svc.durationMin, // "HH:MM"
                            });

                            // await servicesState.refetch?.()
                        }}
                        onSave={(updated) => console.log("save service", updated)}
                        onDelete={(id) => console.log("delete service", id)}
                    />
                ) : activeKey === "masters" ? (
                    <MastersPage
                        masters={mastersState.data}
                        onCreate={async (m) => {
                            await createMaster({
                                name: m.firstName,
                                surname: m.lastName,
                                phone: "string", // TODO: в форме мастера добавь phone, тогда подставишь тут
                            });

                            // await mastersState.refetch?.()
                        }}
                        onSave={(updated) => console.log("save master", updated)}
                        onDelete={(id) => console.log("delete master", id)}
                    />
                ) : activeKey === "clients" ? (
                    <ClientsPage
                        clients={clientsState.data}
                        onCreate={async (c) => {
                            await createClient({
                                name: c.firstName,
                                surname: c.lastName,
                                phone: c.phone,
                                tg_id: c.source === "telegram" ? (c.telegramUsername ?? null) : null,
                            });

                            // await clientsState.refetch?.()
                        }}
                        onSave={(updated) => console.log("save client", updated)}
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
