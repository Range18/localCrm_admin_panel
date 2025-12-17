import "./WeekPicker.css";

type Props = {
    weekStart: Date; // понедельник
    onChange: (weekStart: Date) => void;
};

export function WeekPicker({ weekStart, onChange }: Props) {
    const label = formatWeekLabel(weekStart);

    return (
        <div className="wk">
            <button className="wkBtn" type="button" onClick={() => onChange(addDays(weekStart, -7))}>
                ←
            </button>

            <button className="wkBtn" type="button" onClick={() => onChange(getWeekStart(new Date()))}>
                Сегодня
            </button>

            <div className="wkLabel" title={label}>{label}</div>

            <button className="wkBtn" type="button" onClick={() => onChange(addDays(weekStart, 7))}>
                →
            </button>
        </div>
    );
}

function formatWeekLabel(ws: Date) {
    const we = addDays(ws, 6);
    const a = `${pad2(ws.getDate())}.${pad2(ws.getMonth() + 1)}`;
    const b = `${pad2(we.getDate())}.${pad2(we.getMonth() + 1)}`;
    return `${a} – ${b}`;
}

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function addDays(d: Date, days: number) {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
}

function getWeekStart(d: Date) {
    const x = new Date(d);
    const day = x.getDay(); // 0..6 (вс..сб)
    const diff = (day === 0 ? -6 : 1) - day; // к понедельнику
    x.setDate(x.getDate() + diff);
    x.setHours(0, 0, 0, 0);
    return x;
}
