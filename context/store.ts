import { createContext, type ReactNode, useContext, useRef } from 'react';
import type * as Location from "expo-location";
import { create } from 'zustand'
import type { Category } from '@/api/report';
import type { ImagePickerAsset } from 'expo-image-picker';


type AuthState = {
    isAuthenticated: boolean;
}

const useAuthStore = create<AuthState>()((set) => ({
    isAuthenticated: false,
}));



type CreateReportState = {
    image: ImagePickerAsset | null;
    description: string | "";
    category: Category | null;
    address: string | "";
    setAddress: (address: string | "") => void;
    setCategory: (category: Category | null) => void;
    location: Location.LocationObject | null;
    setLocation: (location: Location.LocationObject | null) => void;
    setImage: (image: ImagePickerAsset | null) => void;
    setDescription: (description: string | "") => void;
};

export const useCreateReportStore = create<CreateReportState>((set) => ({
    image: null,
    category: null,
    location: null,
    description: "",
    address: "",
    setAddress: (address) => set({ address }),
    setLocation: (location) => set({ location }),
    setCategory: (category) => set({ category }),
    setImage: (image) => set({ image }),
    setDescription: (description) => set({ description })

}))