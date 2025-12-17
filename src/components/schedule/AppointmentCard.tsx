import "./AppointmentCard.css";
import type { Appointment } from "./types";

type Props = {
    appt: Appointment;
    top: number;    // px
    height: number; // px
    leftInsetPx?: number;
    rightInsetPx?: number;
    onClick?: (appt: Appointment) => void;
};

export function AppointmentCard({
                                    appt,
                                    top,
                                    height,
                                    leftInsetPx = 8,
                                    rightInsetPx = 8,
                                    onClick,
                                }: Props) {
    const timeText = `${hhmm(appt.start_time)}–${hhmm(appt.finish_time)}`;

    return (
        <button
            type="button"
            className="apptCard"
            style={{
                top,
                height,
                left: leftInsetPx,
                right: rightInsetPx,
            }}
            onClick={() => onClick?.(appt)}
            title={`Запись #${appt.id}`}
        >
            <div className="apptTitle">Запись #{appt.id}</div>
            <div className="apptTime">{timeText}</div>
            <div className="apptMeta">
                <span className="apptPill">₽ {appt.price}</span>
                <span className="apptPillMuted">client {appt.client_id}</span>
            </div>
        </button>
    );
}

function hhmm(t: string) {
    const [h = "00", m = "00"] = t.replace("Z", "").split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}
