import {useCallback, useEffect, useState} from "react";
import {mapClientDtoToCard} from "./mapDtoToCard";
import {deleteClient, getClients} from "../../api/clients/clients";
import type {EntitiesState} from "../types.ts";
import type {ClientCardData} from "../../components/client-card/types.ts";

export function useClients() {
    const [state, setState] = useState<EntitiesState<ClientCardData>>({ status: "loading", data: [], error: null });

    const refetch = useCallback(async () => {
        try {
            setState((s) => ({ ...s, status: "loading", error: null }));
            const dto = await getClients();
            setState({ status: "ready", data: dto.map(mapClientDtoToCard), error: null });
        } catch (e) {
            console.log(e);
            setState({ status: "error", data: [], error: "Ошибка загрузки" });
        }
    }, []);

    useEffect(() => {
        void refetch();
    }, [refetch]);

    const remove = useCallback(async (id: string) => {
        setState((s) => ({ ...s, data: s.data.filter((c) => c.id !== id) }));
        await deleteClient(id);
    }, []);

    return { ...state, refetch, remove };
}
