export interface APIResponse<Data = null, Error = null> {
    errors: Error | null;
    data: Data | null;
    message: string;
    status: string;
}