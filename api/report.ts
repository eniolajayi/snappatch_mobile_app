import type { ImagePickerAsset } from "expo-image-picker";
import { api } from "./setup";
import { Platform } from "react-native";

export function fetchAllReports() {
    return api.get<AllReportsResponse>('reports/');
}

export function createNewReport(data: CreateReportParams) {
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('longitude', data.longitude.toString());
    formData.append('latitude', data.latitude.toString());
    formData.append('description', data.description);
    formData.append('address', data.address);
    formData.append('categoryId', data.categoryId.toString());
    console.log(formData);

    return api.post<CreateReportResponse>('reports/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export function updateReport(data: UpdateReportParams) {
    return api.patch<UpdateReportResponse>(`/reports/${data.id}`, {
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        categoryId: data.categoryId,
    });
}

export function deleteReport(id: string) {
    return api.delete(`/reports/${id}`);
}

export function getReport(id: string) {
    return api.get<GetReportResponse>(`/reports/${id}`);
}

export type GetReportResponse = {
    ok: boolean;
    message: string;
    data: SingleReport;
}

export type SingleReport = {
    id: number;
    imageUrl: string;
    location: Location;
    description: string;
    address: string;
    status: string;
    createdAt: Date;
    updatedAt: null;
    deletedAt: null;
    category: {
        id: number;
        name: string;
    };
    reporter: Reporter;
}

export type Location = {
    x: number;
    y: number;
}

export type Reporter = {
    id: number;
    username: string;
}

export function fetchCategories() {
    return api.get<CategoriesResponse>('/categories');
}

export type CreateReportResponse = {
    ok: boolean;
    message: string;
    data: Report;
};

export type AllReportsResponse = {
    ok: boolean;
    message: string;
    data: Report[];
};

export type CreateReportParams = {
    image: string;
    latitude: number;
    longitude: number;
    description: string;
    address: string;
    categoryId: number;
};

export type UpdateReportParams = {
    id: string;
    description?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    categoryId?: number;
};

export type Category = {
    id: number;
    name: string;
    description: string;
    created_at: string;
};

export type CategoriesResponse = {
    ok: boolean;
    message: string;
    data: Category[];
};

export type UpdateReportResponse = {
    ok: boolean;
    message: string;
    data: Report;
};

export type Report = {
    id: number;
    imageUrl: string;
    location: {
        x: number;
        y: number;
    };
    description: string | null;
    address: string | null;
    status: string;
    category?: {
        id: number;
        name: string;
    };
    updated_at: Date | null;
    created_at: Date;
    deleted_at: Date | null;
    user?: {
        id: number;
        username: string;
    };
};
