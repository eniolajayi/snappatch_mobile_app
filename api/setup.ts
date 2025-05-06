import { getFromSecureStore, StorageKeys } from "@/utils/storage";
import axios from "axios";
import { router } from "expo-router";


const url = "https://snappatch.eniolajayi.com/api/";
export const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json"
    },
})

api.interceptors.request.use(async (config) => {

    console.log("calling >>>", config);

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
    console.log('err',error);
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            router.navigate("/auth/signin");
        }
        return Promise.reject(error);
    }
);