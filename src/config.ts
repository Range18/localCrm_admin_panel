import {readRequiredEnv} from "./utils/readRequiredEnv";

export const appConfig = {
    apiUrl: readRequiredEnv("VITE_API_BASE")
}