import { useMemo, useState } from "react";
import "../PageStyle.css"; // используем rdForm/rdBtn/rdBtnPrimary/rdBtnDanger
import { TilePage } from "../tile-page/TilePage";
import { ClientCard } from "../../components/client-card/ClientCard";
import type { ClientCardData, ClientSource } from "../../components/client-card/types";
import {RightDrawer} from "../../components/right-drawer/RightDrawer.tsx";

type Props = {
    clients: ClientCardData[];
    onSave?: (updated: ClientCardData) => void;
    onDelete?: (id: string) => void;
};

export function ClientsPage({ clients, onSave, onDelete }: Props) {
    const [editingId, setEditingId] = useState<string | null>(null);

    const editingClient = useMemo(
        () => clients.find((c) => c.id === editingId) ?? null,
        [clients, editingId]
    );

    const [draft, setDraft] = useState<ClientCardData | null>(null);

    const openEditor = (id: string) => {
        const found = clients.find((c) => c.id === id);
        setEditingId(id);
        setDraft(found ? { ...found } : null);
    };

    const closeEditor = () => {
        setEditingId(null);
        setDraft(null);
    };

    const save = () => {
        if (!draft) return;

        onSave?.({
            ...draft,
            telegramUsername:
                draft.source === "telegram" ? normalizeUsername(draft.telegramUsername) : undefined,
        });

        closeEditor();
    };

    const remove = () => {
        if (!editingId) return;
        const ok = window.confirm("Удалить клиента? Это действие нельзя отменить.");
        if (!ok) return;
        onDelete?.(editingId);
        closeEditor();
    };

    return (
        <>
            <TilePage<ClientCardData>
                title="Клиенты"
                subtitle="Контакты и источник (Telegram/WhatsApp)"
                items={clients}
                emptyText="Добавь первого клиента"
                ariaLabel="Список клиентов"
                renderItem={(c) => <ClientCard data={c} onEdit={openEditor} />}
            />

            <RightDrawer
                open={!!editingClient}
                title="Редактирование клиента"
                onClose={closeEditor}
                footer={
                    <>
                        <button className="rdBtnDanger" type="button" onClick={remove} disabled={!editingId}>
                            Удалить
                        </button>

                        <div style={{ flex: 1 }} />

                        <button className="rdBtn" type="button" onClick={closeEditor}>
                            Отмена
                        </button>
                        <button className="rdBtnPrimary" type="button" onClick={save} disabled={!draft}>
                            Сохранить
                        </button>
                    </>
                }
            >
                {draft ? (
                    <div className="rdForm">
                        <div className="rdRow">
                            <label className="rdField">
                                <span className="rdLabel">Имя</span>
                                <input
                                    className="rdInput"
                                    value={draft.firstName}
                                    onChange={(e) => setDraft({ ...draft, firstName: e.target.value })}
                                    placeholder="Имя"
                                />
                            </label>

                            <label className="rdField">
                                <span className="rdLabel">Фамилия</span>
                                <input
                                    className="rdInput"
                                    value={draft.lastName}
                                    onChange={(e) => setDraft({ ...draft, lastName: e.target.value })}
                                    placeholder="Фамилия"
                                />
                            </label>
                        </div>

                        <label className="rdField">
                            <span className="rdLabel">Телефон</span>
                            <input
                                className="rdInput"
                                value={draft.phone}
                                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                                placeholder="+7..."
                            />
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
                                        telegramUsername:
                                            e.target.value === "telegram" ? draft.telegramUsername : undefined,
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
                                <input
                                    className="rdInput"
                                    value={draft.telegramUsername ?? ""}
                                    onChange={(e) => setDraft({ ...draft, telegramUsername: e.target.value })}
                                    placeholder="@username"
                                />
                            </label>
                        ) : null}

                        <label className="rdField">
                            <span className="rdLabel">Фото (URL)</span>
                            <input
                                className="rdInput"
                                value={draft.imageUrl ?? ""}
                                onChange={(e) =>
                                    setDraft({ ...draft, imageUrl: e.target.value ? e.target.value : undefined })
                                }
                                placeholder="https://..."
                            />
                        </label>
                    </div>
                ) : (
                    <div className="card">Не удалось загрузить данные клиента</div>
                )}
            </RightDrawer>
        </>
    );
}

function normalizeUsername(v?: string) {
    if (!v) return undefined;
    const s = v.trim();
    if (!s) return undefined;
    return s.replace(/^@+/, ""); // храним без @
}
