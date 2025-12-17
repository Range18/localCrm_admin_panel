import { useMemo, useState } from "react";
import "../services-page/ServicesPage.css"; // переиспользуем стили формы/кнопок
import { TilePage } from "../tile-page/TilePage";
import { MasterCard, type MasterCardData } from "../../components/master-card/MasterCard";
import { RightDrawer } from "../../components/right-drawer/RightDrawer";

type Props = {
    masters: MasterCardData[];
    onSave?: (updated: MasterCardData) => void;
    onDelete?: (id: string) => void;
};

export function MastersPage({ masters, onSave, onDelete }: Props) {
    const [editingId, setEditingId] = useState<string | null>(null);

    const editingMaster = useMemo(
        () => masters.find((m) => m.id === editingId) ?? null,
        [masters, editingId]
    );

    const [draft, setDraft] = useState<MasterCardData | null>(null);

    const openEditor = (id: string) => {
        const found = masters.find((m) => m.id === id);
        setEditingId(id);
        setDraft(found ? { ...found } : null);
    };

    const closeEditor = () => {
        setEditingId(null);
        setDraft(null);
    };

    const save = () => {
        if (!draft) return;
        onSave?.(draft);
        closeEditor();
    };

    const remove = () => {
        if (!editingId) return;
        const ok = window.confirm("Удалить мастера? Это действие нельзя отменить.");
        if (!ok) return;
        onDelete?.(editingId);
        closeEditor();
    };

    return (
        <>
            <TilePage<MasterCardData>
                title="Мастера"
                subtitle="Список специалистов вашей организации"
                items={masters}
                emptyText="Добавь первого мастера"
                ariaLabel="Список мастеров"
                renderItem={(m) => <MasterCard data={m} onEdit={openEditor} />}
            />

            <RightDrawer
                open={!!editingMaster}
                title="Редактирование мастера"
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
                            <span className="rdLabel">Специализация</span>
                            <input
                                className="rdInput"
                                value={draft.specialization}
                                onChange={(e) => setDraft({ ...draft, specialization: e.target.value })}
                                placeholder="Например: Колорист"
                            />
                        </label>

                        <label className="rdField">
                            <span className="rdLabel">Описание</span>
                            <textarea
                                className="rdTextarea"
                                value={draft.description}
                                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                                placeholder="Коротко о мастере"
                                rows={4}
                            />
                        </label>

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
                    <div className="card">Не удалось загрузить данные мастера</div>
                )}
            </RightDrawer>
        </>
    );
}
