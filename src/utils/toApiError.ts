import axios, {AxiosError} from "axios";
import type {ApiError} from "../api/types";


export function toApiError(e: unknown): ApiError {
    if (axios.isAxiosError(e)) {
        const err = e as AxiosError<any>;
        return {
            status: err.response?.status ?? 0,
            message:
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.message ||
                "Request failed",
            details: err.response?.data,
        };
    }
    return {status: 0, message: "Unknown error", details: e};
}
