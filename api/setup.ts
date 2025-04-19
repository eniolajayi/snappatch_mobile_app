const url = "https://snappatch.eniolajayi.com/api/";
import { getFromSecureStore, StorageKeys } from "@/utils/storage";
import axios from "axios";

export const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json"
    },
})

api.interceptors.request.use(async (config) => {
    try {
        const token = await getFromSecureStore(StorageKeys.AUTH_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error("Error retrieving token:", error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});