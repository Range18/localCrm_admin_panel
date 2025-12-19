import { useMemo, useState } from "react";
import type {AppointmentCreate, ClientOption, ServiceOption} from "./types";
import type {MasterOption} from "../components/schedule/types";
import {RightDrawer} from "../components/right-drawer/RightDrawer";

type Props = {
    open: boolean;
    onClose: () => void;

    masters: MasterOption[];
    services: ServiceOption[];
    clients: ClientOption[];

    defaultMasterId?: number;
    defaultDate?: string; // YYYY-MM-DD

    onCreate: (dto: AppointmentCreate) => void;
};

export function CreateAppointmentDrawer({
                                            open,
                                            onClose,
                                            masters,
                                            services,
                                            clients,
                                            defaultMasterId,
                                            defaultDate,
                                            onCreate,
                                        }: Props) {
    const initial = useMemo<AppointmentCreate>(() => {
        const mId = defaultMasterId ?? masters[0]?.id ?? 0;
        const cId = clients[0]?.id ?? 0;
        const sId = services[0]?.id ?? 0;

        return {
            date: defaultDate ?? todayYmd(),
            start_time: "10:00",
            finish_time: "11:00",
            price: 0,
            master_id: mId,
            client_id: cId,
            service_id: sId,
        };
    }, [defaultMasterId, defaultDate, masters, clients, services]);

    const [draft, setDraft] = useState<AppointmentCreate>(initial);

    // когда открывается — сбрасываем на initial
    // (чтобы не оставались значения прошлого создания)
    if (open && (draft.date !== initial.date || (defaultMasterId && draft.master_id !== defaultMasterId))) {
        // безопасно: без эффектов, но может выстрелить лишний рендер — норм для MVP
        // если хочешь — сделаю через useEffect
        // eslint-disable-next-line react/no-unstable-nested-components
    }

    const canSave =
        draft.master_id > 0 &&
        draft.client_id > 0 &&
        draft.service_id > 0 &&
        isValidYmd(draft.date) &&
        isValidTime(draft.start_time) &&
        isValidTime(draft.finish_time);

    const save = () => {
        if (!canSave) return;
        onCreate({
            ...draft,
            start_time: normalizeHHMM(draft.start_time),
            finish_time: normalizeHHMM(draft.finish_time),
        });
        onClose();
        setDraft(initial);
    };

    const close = () => {
        onClose();
        setDraft(initial);
    };

    return (
        <RightDrawer
            open={open}
            title="Новая запись"
            onClose={close}
            footer={
                <>
                    <div style={{ flex: 1 }} />
                    <button className="rdBtn" type="button" onClick={close}>
                        Отмена
                    </button>
                    <button className="rdBtnPrimary" type="button" onClick={save} disabled={!canSave}>
                        Сохранить
                    </button>
                </>
            }
        >
            <div className="rdForm">
                <label className="rdField">
                    <span className="rdLabel">Мастер</span>
                    <select
                        className="rdInput"
                        value={draft.master_id}
                        onChange={(e) => setDraft({ ...draft, master_id: Number(e.target.value) })}
                    >
                        {masters.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="rdField">
                    <span className="rdLabel">Услуга</span>
                    <select
                        className="rdInput"
                        value={draft.service_id}
                        onChange={(e) => setDraft({ ...draft, service_id: Number(e.target.value) })}
                    >
                        {services.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.title}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="rdField">
                    <span className="rdLabel">Клиент</span>
                    <select
                        className="rdInput"
                        value={draft.client_id}
                        onChange={(e) => setDraft({ ...draft, client_id: Number(e.target.value) })}
                    >
                        {clients.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="rdRow">
                    <label className="rdField">
                        <span className="rdLabel">Дата</span>
                        <input
                            className="rdInput"
                            type="date"
                            value={draft.date}
                            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                        />
                    </label>

                    <label className="rdField">
                        <span className="rdLabel">Цена</span>
                        <input
                            className="rdInput"
                            type="number"
                            min={0}
                            value={draft.price}
                            onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                        />
                    </label>
                </div>

                <div className="rdRow">
                    <label className="rdField">
                        <span className="rdLabel">Начало</span>
                        <input
                            className="rdInput"
                            type="time"
                            value={normalizeHHMM(draft.start_time)}
                            onChange={(e) => setDraft({ ...draft, start_time: e.target.value })}
                        />
                    </label>

                    <label className="rdField">
                        <span className="rdLabel">Конец</span>
                        <input
                            className="rdInput"
                            type="time"
                            value={normalizeHHMM(draft.finish_time)}
                            onChange={(e) => setDraft({ ...draft, finish_time: e.target.value })}
                        />
                    </label>
                </div>
            </div>
        </RightDrawer>
    );
}

function normalizeHHMM(v: string) {
    const [h = "00", m = "00"] = v.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}
function todayYmd() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${da}`;
}
function isValidTime(v: string) {
    return /^\d{2}:\d{2}$/.test(normalizeHHMM(v));
}
function isValidYmd(v: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(v);
}
