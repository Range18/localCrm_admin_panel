import axios from "axios";
import {appConfig} from "../config";

export const api = axios.create({
    baseURL: appConfig.apiUrl ?? "",
    headers: { Accept: "application/json" },
    timeout: 15000,
});