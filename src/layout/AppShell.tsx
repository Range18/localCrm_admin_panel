import "./AppShell.css";
import { Sidebar } from "../components/sidebar/Sidebar";
import type { SidebarKey } from "../components/sidebar-tab/SidebarTab";
import type { ReactNode } from "react";

type Props = {
    orgName: string;
    activeKey: SidebarKey;
    onChange: (key: SidebarKey) => void;
    children: ReactNode;
};

export function AppShell({ orgName, activeKey, onChange, children }: Props) {
    return (
        <div className="shell">
            <Sidebar orgName={orgName} activeKey={activeKey} onChange={onChange} />
            <main className="shellMain">{children}</main>
        </div>
    );
}
