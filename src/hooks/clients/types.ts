import type {ClientCardData} from "../../components/client-card/types";

export type ClientsState =
    | { status: "loading"; data: ClientCardData[]; error: null }
    | { status: "ready"; data: ClientCardData[]; error: null }
    | { status: "error"; data: ClientCardData[]; error: string };
