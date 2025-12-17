import {api} from "../http";
import type {MasterDto} from "./MasterDto.ts";


export async function getMasters() {
    const res = await api.get<MasterDto[]>("/api/v1/clients/masters/");
    return res.data;
}
