export type ClientOption = { id: number; name: string };
export type ServiceOption = { id: number; title: string };

export type AppointmentCreate = {
    date: string;       // YYYY-MM-DD
    start_time: string; // HH:MM
    finish_time: string;// HH:MM
    price: number;
    client_id: number;
    master_id: number;
    service_id: number;
};
