import {useEffect, useState} from "react";
import {mapMasterDtoToCard} from "./mapDtoToCard";
import {toApiError} from "../../utils/toApiError";
import type {EntitiesState} from "../types.ts";
import type {MasterCardData} from "../../components/master-card/MasterCard.tsx";
import {getMasters} from "../../api/masters/masters.ts";

export function useMasters() {
    const [state, setState] = useState<EntitiesState<MasterCardData>>({status: "loading", data: [], error: null});

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const dto = await getMasters();
                if (cancelled) return;

                setState({status: "ready", data: dto.map(mapMasterDtoToCard), error: null});
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
