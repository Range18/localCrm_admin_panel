// "12:30" -> "12:30:00.000Z"
// "12:30:15" -> "12:30:15.000Z"
// "12:30:15.123" -> "12:30:15.123Z"
export function toApiTime(time: string) {
    const t = time.trim().replace("Z", "");
    const parts = t.split(":");
    const hh = (parts[0] ?? "00").padStart(2, "0");
    const mm = (parts[1] ?? "00").padStart(2, "0");

    let secMs = parts[2] ?? "00";
    let ss = "00";
    let ms = "000";

    if (secMs.includes(".")) {
        const [s, m] = secMs.split(".");
        ss = (s ?? "00").padStart(2, "0");
        ms = (m ?? "0").padEnd(3, "0").slice(0, 3);
    } else {
        ss = secMs.padStart(2, "0");
    }

    return `${hh}:${mm}:${ss}.${ms}Z`;
}
