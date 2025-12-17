export type Appointment = {
    id: number;
    date: string; // YYYY-MM-DD
    start_time: string; // "HH:MM:SS(.ms)Z" или "HH:MM"
    finish_time: string;
    price: number;
    client_id: number;
    master_id: number;
    service_id: number;
};

export type MasterOption = {
    id: string;
    name: string; // "Имя Фамилия"
};
