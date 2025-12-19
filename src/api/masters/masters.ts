import {api} from "../http";
import type {MasterDto} from "./MasterDto.ts";
import {toApiTime} from "../time";


export async function getMasters() {
    const res = await api.get<MasterDto[]>("/api/v1/clients/masters");
    return res.data;
}


export type MasterCreateDto = {
    name: string;
    surname: string;
    phone: string;
};

// ответ можешь уточнить в swagger schema — пока оставил any
export async function createMaster(dto: MasterCreateDto) {
    const res = await api.post("/api/v1/admin/masters", dto);
    return res.data;
}


export type ServiceCreateDto = {
    name: string;
    duration: string;       // API ждёт "12:40:29.160Z"
    description: string;
    default_price: number;
};

// если у тебя в UI duration = "HH:MM", то можно передавать через createServiceFromUi
export async function createService(dto: ServiceCreateDto) {
    const res = await api.post("/api/v1/admin/services", dto);
    return res.data;
}

// удобный адаптер под твой UI
export function createServiceFromUi(input: {
    name: string;
    description: string;
    price: number;
    durationHHMM: string; // "01:30"
}) {
    return createService({
        name: input.name,
        description: input.description,
        default_price: input.price,
        duration: toApiTime(input.durationHHMM), // -> "01:30:00.000Z"
    });
}