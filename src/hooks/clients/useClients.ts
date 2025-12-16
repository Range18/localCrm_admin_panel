import { useEffect, useState } from "react";
import type {ClientsState} from "./types";
import {mapClientDtoToCard} from "./mapDtoToCard";
import {toApiError} from "../../utils/toApiError";
import {getClients} from "../../api/clients/clients";

export function useClients() {
    const [state, setState] = useState<ClientsState>({ status: "loading", data: [], error: null });

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const dto = await getClients();
                if (cancelled) return;

                setState({ status: "ready", data: dto.map(mapClientDtoToCard), error: null });
            } catch (e) {
                if (cancelled) return;
                setState({ status: "error", data: [], error: toApiError(e).message });
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return state;
}
