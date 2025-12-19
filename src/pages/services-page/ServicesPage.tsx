import { useMemo, useState } from "react";
import "../PageStyle.css";

import { TilePage } from "../tile-page/TilePage";
import { RightDrawer } from "../../components/right-drawer/RightDrawer";
import { ServiceCard, type ServiceCardData } from "../../components/service-card/ServiceCard";

type Mode = "create" | "edit" | null;

type Props = {
    services: ServiceCardData[];
    onCreate?: (created: ServiceCardData) => void;
    onSave?: (updated: ServiceCardData) => void;
    onDelete?: (id: string) => void;
};

export function ServicesPage({ services, onCreate, onSave, onDelete }: Props) {
    const [mode, setMode] = useState<Mode>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draft, setDraft] = useState<ServiceCardData | null>(null);

    const editingService = useMemo(
        () => services.find((s) => s.id === editingId) ?? null,
        [services, editingId]
    );

    const openEdit = (id: string) => {
        const found = services.find((s) => s.id === id);
        setMode("edit");
        setEditingId(id);
        setDraft(found ? { ...found } : null);
    };

    const openCreate = () => {
        setMode("create");
        setEditingId(null);
        setDraft({
            id: crypto.randomUUID(),
            title: "",
            description: "",
            price: 0,
            durationMin: "00:30",
            currency: "RUB",
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
        if (mode === "create") onCreate?.(draft);
        if (mode === "edit") onSave?.(draft);
        close();
    };

    const remove = () => {
        if (mode !== "edit" || !editingId) return;
        if (!window.confirm("Удалить услугу?")) return;
        onDelete?.(editingId);
        close();
    };

    const drawerOpen = mode !== null;

    return (
        <>
            <TilePage<ServiceCardData>
                title="Услуги"
                subtitle="Цена, длительность, описание"
                items={services}
                emptyText="Добавь первую услугу"
                ariaLabel="Список услуг"
                renderItem={(s) => <ServiceCard data={s} onEdit={openEdit} />}
                fabOnClick={openCreate}
                fabAriaLabel="Создать услугу"
            />

            <RightDrawer
                open={drawerOpen}
                title={mode === "create" ? "Новая услуга" : "Редактирование услуги"}
                onClose={close}
                footer={
                    <>
                        {mode === "edit" ? (
                            <>
                                <button className="rdBtnDanger" type="button" onClick={remove} disabled={!editingService}>
                                    Удалить
                                </button>
                                <div style={{ flex: 1 }} />
                            </>
                        ) : (
                            <div style={{ flex: 1 }} />
                        )}

                        <button className="rdBtn" type="button" onClick={close}>Отмена</button>
                        <button className="rdBtnPrimary" type="button" onClick={save} disabled={!draft}>
                            Сохранить
                        </button>
                    </>
                }
            >
                {draft ? (
                    <div className="rdForm">
                        <label className="rdField">
                            <span className="rdLabel">Название</span>
                            <input className="rdInput" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                        </label>

                        <label className="rdField">
                            <span className="rdLabel">Описание</span>
                            <textarea className="rdTextarea" rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
                        </label>

                        <div className="rdRow">
                            <label className="rdField">
                                <span className="rdLabel">Цена</span>
                                <input className="rdInput" type="number" min={0} value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
                            </label>

                            <label className="rdField">
                                <span className="rdLabel">Длительность</span>
                                <input className="rdInput" type="time" value={toHHMM(draft.durationMin)} onChange={(e) => setDraft({ ...draft, durationMin: e.target.value })} />
                            </label>
                        </div>

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

function toHHMM(t: string) {
    const [h = "00", m = "00"] = t.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}
