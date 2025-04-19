import type { APIResponse } from "@/types";
import { api } from "./setup";

type SignInParams = {
    username: string;
    password: string;
}

type RegisterUserParams = {
    username: string;
    password: string;
}
type RegisterUserResponse = {
    ok: boolean;
    message: string;
}

type LoginResponse = {
    ok: boolean;
    message: string;
    token: string
}

export function loginUser(data: SignInParams) {
    return api.post<LoginResponse>('/login', data);
}

export function registerUser(data: RegisterUserParams) {
    return api.post<RegisterUserResponse>('/register', data);
}
