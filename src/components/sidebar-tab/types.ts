import type { ReactNode } from "react";

export type SidebarKey = "schedule" | "services" | "masters" | "clients";

export type Props = {
    id: SidebarKey;
    label: string;
    active?: boolean;
    onClick?: (id: SidebarKey) => void;
    icon?: ReactNode;
};
