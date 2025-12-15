import "./Sidebar.css";
import {SidebarTab} from "../sidebar-tab/SidebarTab";
import type {SidebarKey} from "../sidebar-tab/types";

type Props = {
    activeKey: SidebarKey;
    onChange: (key: SidebarKey) => void;
    orgName: string;
};

export function Sidebar({ activeKey, onChange, orgName }: Props) {
    return (
        <aside className="sb" aria-label="Навигация">
            <div className="sbTop">
                <div className="sbBrand" aria-label="Логотип">
                    <span className="sbBrandMark" aria-hidden="true" />
                    <span className="sbBrandText">CRM</span>
                </div>
            </div>

            <nav className="sbNav">
                <SidebarTab
                    id="schedule"
                    label="Расписание"
                    active={activeKey === "schedule"}
                    onClick={onChange}
                    icon={<IconCalendar />}
                />
                <SidebarTab
                    id="services"
                    label="Услуги"
                    active={activeKey === "services"}
                    onClick={onChange}
                    icon={<IconGrid />}
                />
                <SidebarTab
                    id="masters"
                    label="Мастера"
                    active={activeKey === "masters"}
                    onClick={onChange}
                    icon={<IconUsers />}
                />
                <SidebarTab
                    id="clients"
                    label="Клиенты"
                    active={activeKey === "clients"}
                    onClick={onChange}
                    icon={<IconUser />}
                />
            </nav>

            <div className="sbFooter">
                <div className="sbOrg">
          <span className="sbOrgIcon" aria-hidden="true">
            <IconBriefcase />
          </span>
                    <div className="sbOrgText">
                        <div className="sbOrgTitle">{orgName}</div>
                        <div className="sbOrgHint">Организация</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

/** Заглушки иконок — заменишь на свои SVG */
function IconCalendar() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M6 2v3M14 2v3M3.5 7.2h13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <rect
                x="3.5"
                y="4.5"
                width="13"
                height="13"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path d="M6.3 10.2h3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function IconGrid() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <rect x="11" y="3" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3" y="11" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <rect x="11" y="11" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    );
}

function IconUsers() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M7.4 10.2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path
                d="M13.4 9.6a2.4 2.4 0 1 0-1.3-4.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M3.4 17.2c.8-3 3-4.4 4-4.4s3.2 1.4 4 4.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M12.1 12.9c1.4.4 2.9 1.6 3.4 4.3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconUser() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M10 10.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Z"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path
                d="M4.2 17.2c1-3.3 3.4-4.9 5.8-4.9s4.8 1.6 5.8 4.9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconBriefcase() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M7 6.2V5.4c0-1 0.8-1.8 1.8-1.8h2.4c1 0 1.8.8 1.8 1.8v.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <rect
                x="3"
                y="6.2"
                width="14"
                height="11"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path d="M3.4 10.2h13.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}
