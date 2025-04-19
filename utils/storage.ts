import * as SecureStore from "expo-secure-store";

export const StorageKeys = {
    AUTH_TOKEN: 'auth_token',
}

export async function saveToSecureStore(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
};

export async function getFromSecureStore(key: string) {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    }

    return null;
};