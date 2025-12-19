import { useMemo, useState } from "react";
import "../PageStyle.css"
import { TilePage } from "../tile-page/TilePage";
import { MasterCard, type MasterCardData } from "../../components/master-card/MasterCard";
import {RightDrawer} from "../../components/right-drawer/RightDrawer";

type Mode = "create" | "edit" | null;

type Props = {
    masters: MasterCardData[];
    onCreate?: (created: MasterCardData) => void;
    onSave?: (updated: MasterCardData) => void;
    onDelete?: (id: string) => void;
};

export function MastersPage({ masters, onCreate, onSave, onDelete }: Props) {
    const [mode, setMode] = useState<Mode>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draft, setDraft] = useState<MasterCardData | null>(null);

    const editingMaster = useMemo(
        () => masters.find((m) => m.id === editingId) ?? null,
        [masters, editingId]
    );

    const openEdit = (id: string) => {
        const found = masters.find((m) => m.id === id);
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
            specialization: "",
            description: "",
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
        if (!window.confirm("Удалить мастера?")) return;
        onDelete?.(editingId);
        close();
    };

    return (
        <>
            <TilePage<MasterCardData>
                title="Мастера"
                subtitle="Список специалистов вашей организации"
                items={masters}
                emptyText="Добавь первого мастера"
                ariaLabel="Список мастеров"
                renderItem={(m) => <MasterCard data={m} onEdit={openEdit} />}
                fabOnClick={openCreate}
                fabAriaLabel="Создать мастера"
            />

            <RightDrawer
                open={mode !== null}
                title={mode === "create" ? "Новый мастер" : "Редактирование мастера"}
                onClose={close}
                footer={
                    <>
                        {mode === "edit" ? (
                            <>
                                <button className="rdBtnDanger" type="button" onClick={remove} disabled={!editingMaster}>
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
                            <span className="rdLabel">Специализация</span>
                            <input className="rdInput" value={draft.specialization} onChange={(e) => setDraft({ ...draft, specialization: e.target.value })} />
                        </label>

                        <label className="rdField">
                            <span className="rdLabel">Описание</span>
                            <textarea className="rdTextarea" rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
                        </label>

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
