import {useCallback, useEffect, useState} from "react";
import {mapServiceDtoToCard} from "./mapDtoToCard";
import type {EntitiesState} from "../types.ts";
import type {ServiceCardData} from "../../components/service-card/ServiceCard.tsx";
import {deleteClient} from "../../api/clients/clients.ts";
import {getServices} from "../../api/services/services.ts";

export function useServices() {
    const [state, setState] = useState<EntitiesState<ServiceCardData>>({status: "loading", data: [], error: null});

    const refetch = useCallback(async () => {
        try {
            setState((s) => ({ ...s, status: "loading", error: null }));
            const dto = await getServices();
            setState({ status: "ready", data: dto.map(mapServiceDtoToCard), error: null });
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
