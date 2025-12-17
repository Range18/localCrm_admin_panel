import {useCallback, useEffect, useState} from "react";
import type {EntitiesState} from "../types.ts";
import type {Appointment} from "../../components/schedule/types.ts";
import {getAppointments} from "../../api/appointments/appointments.ts";

export function useAppointments() {
    const [state, setState] = useState<EntitiesState<Appointment>>({status: "loading", data: [], error: null});

    const refetch = useCallback(async () => {
        try {
            setState((s) => ({ ...s, status: "loading", error: null }));
            const dto = await getAppointments();
            setState({ status: "ready", data: dto, error: null });
        } catch (e) {
            console.log(e);
            setState({ status: "error", data: [], error: "Ошибка загрузки" });
        }
    }, []);

    useEffect(() => {
        void refetch();
    }, [refetch]);

    return { ...state, refetch };
}
