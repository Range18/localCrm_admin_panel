import "./CalendarWeek.css";
import type { Appointment } from "./types";
import { AppointmentCard } from "./AppointmentCard";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    weekStart: Date; // понедельник
    appointments: Appointment[];
    startHour?: number;
    endHour?: number;
    onAppointmentClick?: (appt: Appointment) => void;
};

const HOUR_PX = 64;

export function CalendarWeek({
                                 weekStart,
                                 appointments,
                                 startHour = 0,
                                 endHour = 24,
                                 onAppointmentClick,
                             }: Props) {
    const gridRef = useRef<HTMLDivElement | null>(null);

    const [scrollTop, setScrollTop] = useState(0);
    const [sbw, setSbw] = useState(0); // scrollbar width

    const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
    const hours = useMemo(() => Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i), [startHour, endHour]);

    const today = new Date();
    const todayKey = ymd(today);
    const nowMin = today.getHours() * 60 + today.getMinutes();

    // измеряем ширину скроллбара у сетки (чтобы хедер не уезжал)
    useEffect(() => {
        const el = gridRef.current;
        if (!el) return;

        const measure = () => {
            const w = el.offsetWidth - el.clientWidth;
            setSbw(w > 0 ? w : 0);
        };

        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(el);

        return () => ro.disconnect();
    }, []);

    return (
        <div className="cal" style={{ ["--sbw" as any]: `${sbw}px` }}>
            <div className="calHeader">
                <div className="calHeaderLeft" />
                {days.map((d) => {
                    const isToday = ymd(d) === todayKey;
                    return (
                        <div key={ymd(d)} className={`calHeaderDay ${isToday ? "isToday" : ""}`}>
                            <div className="calDow">{dowRu(d.getDay())}</div>
                            <div className="calDate">{d.getDate()}</div>
                        </div>
                    );
                })}
                <div className="calHeaderGutter" />
            </div>

            <div className="calBody">
                {/* Время слева (двигаем трансформом по scrollTop) */}
                <div className="calTimes" aria-hidden="true">
                    <div className="calTimesInner" style={{ transform: `translateY(-${scrollTop}px)` }}>
                        {hours.map((h) => (
                            <div key={h} className="calTimeRow" style={{ height: HOUR_PX }}>
                                <span className="calTimeLabel">{pad2(h)}:00</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Сетка дней (она скроллится) */}
                <div
                    className="calGrid"
                    ref={gridRef}
                    onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
                >
                    {days.map((d) => {
                        const dayKey = ymd(d);
                        const dayAppts = appointments.filter((a) => a.date === dayKey);

                        return (
                            <div key={dayKey} className="calDayCol">
                                {hours.slice(0, -1).map((h) => (
                                    <div key={h} className="calHourLine" style={{ top: (h - startHour) * HOUR_PX }} />
                                ))}

                                {dayKey === todayKey ? (
                                    <div
                                        className="calNow"
                                        style={{ top: (nowMin - startHour * 60) * (HOUR_PX / 60) }}
                                        aria-label="Текущее время"
                                    >
                                        <span className="calNowDot" />
                                        <span className="calNowLine" />
                                    </div>
                                ) : null}

                                {dayAppts.map((a) => {
                                    const s = timeToMin(a.start_time);
                                    const f = timeToMin(a.finish_time);
                                    const top = (s - startHour * 60) * (HOUR_PX / 60);
                                    const height = Math.max(28, (f - s) * (HOUR_PX / 60));

                                    return (
                                        <AppointmentCard
                                            key={a.id}
                                            appt={a}
                                            top={top}
                                            height={height}
                                            onClick={onAppointmentClick}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function timeToMin(t: string) {
    const clean = t.replace("Z", "");
    const [hh = "0", mm = "0"] = clean.split(":");
    return parseInt(hh, 10) * 60 + parseInt(mm, 10);
}

function ymd(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${da}`;
}

function addDays(d: Date, days: number) {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    x.setHours(0, 0, 0, 0);
    return x;
}

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function dowRu(jsDay: number) {
    return ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"][jsDay];
}
