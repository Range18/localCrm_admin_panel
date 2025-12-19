import { useMemo, useState } from "react";
import "../PageStyle.css"
import { TilePage } from "../tile-page/TilePage";
import { ClientCard } from "../../components/client-card/ClientCard";
import type { ClientCardData, ClientSource } from "../../components/client-card/types";
import {RightDrawer} from "../../components/right-drawer/RightDrawer";

type Mode = "create" | "edit" | null;

type Props = {
    clients: ClientCardData[];
    onCreate?: (created: ClientCardData) => void;
    onSave?: (updated: ClientCardData) => void;
    onDelete?: (id: string) => void;
};

export function ClientsPage({ clients, onCreate, onSave, onDelete }: Props) {
    const [mode, setMode] = useState<Mode>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draft, setDraft] = useState<ClientCardData | null>(null);

    const editingClient = useMemo(
        () => clients.find((c) => c.id === editingId) ?? null,
        [clients, editingId]
    );

    const openEdit = (id: string) => {
        const found = clients.find((c) => c.id === id);
        setMode("edit");
        setEditingId(id);
        setDraft(found ? { ...found } : null);
    };

    const openCreate = () => {
        setMode("create");
        setEditingId(null);
        setDraft({
            id: crypto.randomUUID(),
            firstName: "",
            lastName: "",
            phone: "",
            source: "telegram",
            telegramUsername: "",
            imageUrl: undefined,
        });
    };

    const close = () => {
        setMode(null);
        setEditingId(null);
        setDraft(null);
    };

    const save = () => {
        if (!draft) return;

        const normalized: ClientCardData = {
            ...draft,
            telegramUsername: draft.source === "telegram" ? normalizeUsername(draft.telegramUsername) : undefined,
        };

        if (mode === "create") onCreate?.(normalized);
        if (mode === "edit") onSave?.(normalized);
        close();
    };

    const remove = () => {
        if (mode !== "edit" || !editingId) return;
        if (!window.confirm("Удалить клиента?")) return;
        onDelete?.(editingId);
        close();
    };

    return (
        <>
            <TilePage<ClientCardData>
                title="Клиенты"
                subtitle="Контакты и источник (Telegram/WhatsApp)"
                items={clients}
                emptyText="Добавь первого клиента"
                ariaLabel="Список клиентов"
                renderItem={(c) => <ClientCard data={c} onEdit={openEdit} />}
                fabOnClick={openCreate}
                fabAriaLabel="Создать клиента"
            />

            <RightDrawer
                open={mode !== null}
                title={mode === "create" ? "Новый клиент" : "Редактирование клиента"}
                onClose={close}
                footer={
                    <>
                        {mode === "edit" ? (
                            <>
                                <button className="rdBtnDanger" type="button" onClick={remove} disabled={!editingClient}>
                                    Удалить
                                </button>
                                <div style={{ flex: 1 }} />
                            </>
                        ) : (
                            <div style={{ flex: 1 }} />
                        )}

                        <button className="rdBtn" type="button" onClick={close}>Отмена</button>
                        <button className="rdBtnPrimary" type="button" onClick={save} disabled={!draft}>Сохранить</button>
                    </>
                }
            >
                {draft ? (
                    <div className="rdForm">
                        <div className="rdRow">
                            <label className="rdField">
                                <span className="rdLabel">Имя</span>
                                <input className="rdInput" value={draft.firstName} onChange={(e) => setDraft({ ...draft, firstName: e.target.value })} />
                            </label>
                            <label className="rdField">
                                <span className="rdLabel">Фамилия</span>
                                <input className="rdInput" value={draft.lastName} onChange={(e) => setDraft({ ...draft, lastName: e.target.value })} />
                            </label>
                        </div>

                        <label className="rdField">
                            <span className="rdLabel">Телефон</span>
                            <input className="rdInput" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+7..." />
                        </label>

                        <label className="rdField">
                            <span className="rdLabel">Источник</span>
                            <select
                                className="rdInput"
                                value={draft.source}
                                onChange={(e) =>
                                    setDraft({
                                        ...draft,
                                        source: e.target.value as ClientSource,
                                        telegramUsername: e.target.value === "telegram" ? (draft.telegramUsername ?? "") : undefined,
                                    })
                                }
                            >
                                <option value="telegram">Telegram</option>
                                <option value="whatsapp">WhatsApp</option>
                            </select>
                        </label>

                        {draft.source === "telegram" ? (
                            <label className="rdField">
                                <span className="rdLabel">Telegram username</span>
                                <input className="rdInput" value={draft.telegramUsername ?? ""} onChange={(e) => setDraft({ ...draft, telegramUsername: e.target.value })} placeholder="@username" />
                            </label>
                        ) : null}

                        <label className="rdField">
                            <span className="rdLabel">Фото (URL)</span>
                            <input className="rdInput" value={draft.imageUrl ?? ""} onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value || undefined })} />
                        </label>
                    </div>
                ) : (
                    <div className="card">Нет данных</div>
                )}
            </RightDrawer>
        </>
    );
}

function normalizeUsername(v?: string) {
    if (!v) return undefined;
    const s = v.trim();
    if (!s) return undefined;
    return s.replace(/^@+/, "");
}
