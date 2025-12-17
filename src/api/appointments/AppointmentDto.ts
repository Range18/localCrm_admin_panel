export type AppointmentDto = {
    id: number;
    date: string; // YYYY-MM-DD
    start_time: string; // "HH:MM:SS(.ms)Z" или "HH:MM"
    finish_time: string;
    price: number;
    client_id: number;
    master_id: number;
    service_id: number;
};
