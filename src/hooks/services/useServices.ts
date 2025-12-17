import {useEffect, useState} from "react";
import {mapServiceDtoToCard} from "./mapDtoToCard";
import {toApiError} from "../../utils/toApiError";
import type {EntitiesState} from "../types.ts";
import type {ServiceCardData} from "../../components/service-card/ServiceCard.tsx";
import {getServices} from "../../api/services/services.ts";

export function useServices() {
    const [state, setState] = useState<EntitiesState<ServiceCardData>>({status: "loading", data: [], error: null});

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const dto = await getServices();
                if (cancelled) return;

                setState({status: "ready", data: dto.map(mapServiceDtoToCard), error: null});
            } catch (e) {
                if (cancelled) return;
                setState({status: "error", data: [], error: toApiError(e).message});
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return state;
}
