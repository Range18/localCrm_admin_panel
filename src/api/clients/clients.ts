import {api} from "../http";


export async function deleteClient(clientId: string) {
    await api.delete(`/api/v1/clients/${clientId}`);
}


export type ClientDto = {
    id: number;
    name: string;
    surname: string;
    phone: string;
    tg_id: string | null;
};

export type ClientCreateDto = {
    name: string;
    surname: string;
    phone: string;
    tg_id?: string | null;
};

const PATH = "/api/v1/clients/";

export async function getClients() {
    const res = await api.get<ClientDto[]>(PATH);
    return res.data;
}

export async function createClient(dto: ClientCreateDto) {
    const res = await api.post<ClientDto>(PATH, dto);
    return res.data;
}
