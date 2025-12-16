import {api} from "../http";
import type {ClientDto} from "./ClientDto";


export async function getClients() {
    const res = await api.get<ClientDto[]>("/api/v1/clients/");
    return res.data;
}
