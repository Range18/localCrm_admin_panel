import {api} from "../http";
import type {ServiceDto} from "./ServiceDto.ts";


export async function getServices() {
    const res = await api.get<ServiceDto[]>("/api/v1/clients/services/");
    return res.data;
}
