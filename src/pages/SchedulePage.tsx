import { useMemo, useState } from "react";
import "./SchedulePage.css";
import type {Appointment, MasterOption} from "../components/schedule/types.ts";
import {CalendarWeek} from "../components/schedule/CalendarWeek.tsx";
import {WeekPicker} from "../components/schedule/WeekPicker.tsx";

type Props = {
    masters: MasterOption[];
    appointments: Appointment[];
};

export function SchedulePage({ masters, appointments }: Props) {
    const [selectedMasterId, setSelectedMasterId] = useState<number | "all">("all");
    const [weekStart, setWeekStart] = useState<Date>(getWeekStart(new Date()));

    const filtered = useMemo(() => {
        const ws = ymd(weekStart);
        const we = ymd(addDays(weekStart, 6));

        return appointments.filter((a) => {
            const inWeek = a.date >= ws && a.date <= we;
            const byMaster = selectedMasterId === "all" ? true : a.master_id === selectedMasterId;
            return inWeek && byMaster;
        });
    }, [appointments, selectedMasterId, weekStart]);

    return (
        <div className="page">
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Расписание</h1>
                    <p className="pageSubtitle">Фильтр по мастеру и навигация по неделям</p>
                </div>

                <div className="schControls">
                    <select
                        className="schSelect"
                        value={selectedMasterId}
                        onChange={(e) => {
                            const v = e.target.value;
                            setSelectedMasterId(v === "all" ? "all" : Number(v));
                        }}
                    >
                        <option value="all">Все мастера</option>
                        {masters.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    <WeekPicker weekStart={weekStart} onChange={setWeekStart} />
                </div>
            </div>

            <div className="card schCard">
                <CalendarWeek
                    weekStart={weekStart}
                    appointments={filtered}
                    onAppointmentClick={(a) => console.log("open appointment", a)}
                />
            </div>
        </div>
    );
}

function getWeekStart(d: Date) {
    const x = new Date(d);
    const day = x.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    x.setDate(x.getDate() + diff);
    x.setHours(0, 0, 0, 0);
    return x;
}

function addDays(d: Date, days: number) {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    x.setHours(0, 0, 0, 0);
    return x;
}

function ymd(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${da}`;
}
