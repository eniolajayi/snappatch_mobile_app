import { createContext, type ReactNode, useContext, useRef } from 'react'
import { create } from 'zustand'


type AuthState = {
    isAuthenticated: boolean;
}

const useAuthStore = create<AuthState>()((set) => ({
    isAuthenticated: false,
}));