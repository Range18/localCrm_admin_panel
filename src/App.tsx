import { useMemo, useState } from "react";
import "./App.css";
import { AppShell } from "./layout/AppShell";

import type { ServiceCardData } from "./components/service-card/ServiceCard";
import { ServiceCard } from "./components/service-card/ServiceCard";

import type { MasterCardData } from "./components/master-card/MasterCard";
import { MasterCard } from "./components/master-card/MasterCard";

import type { SidebarKey } from "./components/sidebar-tab/types";
import { TilePage } from "./pages/tile-page/TilePage";
import {ClientCard} from "./components/client-card/ClientCard";
import type {ClientCardData} from "./components/client-card/types";
import {useClients} from "./hooks/clients/useClients";

export default function App() {
    const [activeKey, setActiveKey] = useState<SidebarKey>("schedule");

    const services = useMemo<ServiceCardData[]>(
        () => [
            { id: "1", title: "Стрижка", description: "Классическая стрижка с мытьём и укладкой.", price: 1500, durationMin: 60, currency: "RUB" },
            { id: "2", title: "Окрашивание", description: "Подбор оттенка, окрашивание и уход.", price: 4500, durationMin: 120, currency: "RUB" },
            { id: "3", title: "Маникюр", description: "Обработка + покрытие (по желанию).", price: 2000, durationMin: 90, currency: "RUB" },
        ],
        []
    );

    // const clients = useMemo<ClientCardData[]>(
    //     () => [
    //         {
    //             id: "c1",
    //             firstName: "Алексей",
    //             lastName: "Сидоров",
    //             phone: "+7 999 123-45-67",
    //             source: "telegram",
    //             telegramUsername: "alex_sidorov",
    //             imageUrl: "",
    //         },
    //         {
    //             id: "c2",
    //             firstName: "Дарья",
    //             lastName: "Ким",
    //             phone: "+7 916 222-11-00",
    //             source: "whatsapp",
    //         },
    //         {
    //             id: "c3",
    //             firstName: "Никита",
    //             lastName: "Орлов",
    //             phone: "+7 903 555-88-99",
    //             source: "telegram",
    //         },
    //     ],
    //     []
    // );


    const clients = useClients();

    // ✅ моковые мастера
    const masters = useMemo<MasterCardData[]>(
        () => [
            {
                id: "m1",
                firstName: "Анна",
                lastName: "Иванова",
                specialization: "Парикмахер-стилист",
                description: "Стрижки, укладки, уход. 6 лет опыта, работает аккуратно и быстро.",
                imageUrl: "", // можешь вставить ссылку на фото
            },
            {
                id: "m2",
                firstName: "Мария",
                lastName: "Петрова",
                specialization: "Колорист",
                description: "Окрашивания любой сложности, блонд, тонирование, подбор оттенка.",
            },
            {
                id: "m3",
                firstName: "Екатерина",
                lastName: "Смирнова",
                specialization: "Мастер маникюра",
                description: "Комбинированный маникюр, покрытие, дизайн. Любит минимализм.",
            },
            {
                id: "m4",
                firstName: "Ольга",
                lastName: "Кузнецова",
                specialization: "Бровист",
                description: "Коррекция и окрашивание бровей, ламинирование, подбор формы.",
            },
            {
                id: "m5",
                firstName: "Ирина",
                lastName: "Соколова",
                specialization: "Косметолог",
                description: "Уходовые процедуры, чистки, консультации по домашнему уходу.",
            },
        ],
        []
    );

    return (
        <div className="app">
            <AppShell orgName="Моя организация" activeKey={activeKey} onChange={setActiveKey}>
                {activeKey === "services" ? (
                    <TilePage<ServiceCardData>
                        title="Услуги"
                        subtitle="Цена, длительность, описание"
                        items={services}
                        emptyText="Добавь первую услугу"
                        ariaLabel="Список услуг"
                        renderItem={(s) => <ServiceCard data={s} onEdit={(id) => console.log("edit service", id)} />}
                    />
                ) : activeKey === "masters" ? (
                    <TilePage<MasterCardData>
                        title="Мастера"
                        subtitle="Список специалистов вашей организации"
                        items={masters}
                        emptyText="Добавь первого мастера"
                        ariaLabel="Список мастеров"
                        renderItem={(m) => <MasterCard data={m} onEdit={(id) => console.log("edit master", id)} />}
                    />
                ) : activeKey === "clients" ? (
                    <TilePage<ClientCardData>
                        title="Клиенты"
                        subtitle="Контакты и источник (Telegram/WhatsApp)"
                        items={clients}
                        emptyText="Добавь первого клиента"
                        ariaLabel="Список клиентов"
                        renderItem={(c) => <ClientCard data={c} onEdit={(id) => console.log("edit client", id)} />}
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
