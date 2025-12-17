import {api} from "../http";
import type {AppointmentDto} from "./AppointmentDto.ts";


export async function getAppointments() {
    const res = await api.get<AppointmentDto[]>("/api/v1/clients/appointments/");
    return res.data;
}
