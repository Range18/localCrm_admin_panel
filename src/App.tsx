import { useState } from "react";
import "./App.css";
import { AppShell } from "./layout/AppShell";
import type { SidebarKey } from "./components/sidebar-tab/SidebarTab";

export default function App() {
    const [activeKey, setActiveKey] = useState<SidebarKey>("schedule");

    return (
        <div className="app">
            <AppShell
                orgName="Моя организация"
                activeKey={activeKey}
                onChange={setActiveKey}
            >
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
            </AppShell>
        </div>
    );
}
