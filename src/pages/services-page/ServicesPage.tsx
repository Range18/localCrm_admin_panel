import { useMemo, useState } from "react";
import "../PageStyle.css";
import {TilePage} from "../tile-page/TilePage.tsx";
import {ServiceCard, type ServiceCardData} from "../../components/service-card/ServiceCard.tsx";
import {RightDrawer} from "../../components/right-drawer/RightDrawer.tsx";

type Props = {
    services: ServiceCardData[];
    onSave?: (updated: ServiceCardData) => void;
    onDelete?: (id: string) => void;
};

export function ServicesPage({ services, onSave, onDelete }: Props) {
    const [editingId, setEditingId] = useState<string | null>(null);

    const editingService = useMemo(
        () => services.find((s) => s.id === editingId) ?? null,
        [services, editingId]
    );

    const [draft, setDraft] = useState<ServiceCardData | null>(null);

    // когда открываем — наполняем draft
    const openEditor = (id: string) => {
        const found = services.find((s) => s.id === id);
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
            durationMin: normalizeTime(draft.durationMin),
        });
        closeEditor();
    };

    const remove = () => {
        if (!editingId) return;

        const ok = window.confirm("Удалить услугу? Это действие нельзя отменить.");
        if (!ok) return;

        onDelete?.(editingId);
        closeEditor();
    };

    return (
        <>
            <TilePage<ServiceCardData>
                title="Услуги"
                subtitle="Цена, длительность, описание"
                items={services}
                emptyText="Добавь первую услугу"
                ariaLabel="Список услуг"
                renderItem={(s) => <ServiceCard data={s} onEdit={openEditor} />}
            />

            <RightDrawer
                open={!!editingService}
                title="Редактирование услуги"
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
                        <label className="rdField">
                            <span className="rdLabel">Название</span>
                            <input
                                className="rdInput"
                                value={draft.title}
                                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                                placeholder="Например: Стрижка"
                            />
                        </label>

                        <label className="rdField">
                            <span className="rdLabel">Описание</span>
                            <textarea
                                className="rdTextarea"
                                value={draft.description}
                                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                                placeholder="Коротко опиши услугу"
                                rows={4}
                            />
                        </label>

                        <div className="rdRow">
                            <label className="rdField">
                                <span className="rdLabel">Цена</span>
                                <input
                                    className="rdInput"
                                    type="number"
                                    value={draft.price}
                                    onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                                    min={0}
                                />
                            </label>

                            <label className="rdField">
                                <span className="rdLabel">Длительность</span>
                                <input
                                    className="rdInput"
                                    type="time"
                                    value={toTimeHHMM(draft.durationMin)}
                                    onChange={(e) => setDraft({ ...draft, durationMin: e.target.value })}
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className="card">Не удалось загрузить данные услуги</div>
                )}
            </RightDrawer>
        </>
    );
}

function toTimeHHMM(time: string) {
    // поддержка "HH:MM:SS" и "HH:MM"
    const [h = "00", m = "00"] = time.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

function normalizeTime(time: string) {
    // если backend ждёт "HH:MM:SS", можно вернуть `${HH}:${MM}:00`
    const hhmm = toTimeHHMM(time);
    return hhmm; // оставляю "HH:MM" как у тебя в ServiceCard
}
