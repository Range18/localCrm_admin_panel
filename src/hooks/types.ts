export type EntitiesState<T> =
    | { status: "loading"; data: T[]; error: null }
    | { status: "ready"; data: T[]; error: null }
    | { status: "error"; data: T[]; error: string };
