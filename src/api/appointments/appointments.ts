import {api} from "../http";
import type {AppointmentDto} from "./AppointmentDto.ts";
import {toApiTime} from "../time";


export async function getAppointments() {
    const res = await api.get<AppointmentDto[]>("/api/v1/clients/appointments");
    return res.data;
}


export type AppointmentCreateDto = {
    date: string;        // "2025-12-19"
    start_time: string;  // "12:40:44.732Z"
    finish_time: string; // "12:40:44.732Z"
    price: number;
    client_id: number;
    service_id: number;
    master_id: number;
};

export async function createAppointment(dto: AppointmentCreateDto) {
    const res = await api.post("/api/v1/admin/appointments", dto);
    return res.data;
}

// адаптер под твой UI (HH:MM)
export function createAppointmentFromUi(input: {
    date: string;
    startHHMM: string;
    finishHHMM: string;
    price: number;
    client_id: number;
    service_id: number;
    master_id: number;
}) {
    return createAppointment({
        date: input.date,
        start_time: toApiTime(input.startHHMM),
        finish_time: toApiTime(input.finishHHMM),
        price: input.price,
        client_id: input.client_id,
        service_id: input.service_id,
        master_id: input.master_id,
    });
}