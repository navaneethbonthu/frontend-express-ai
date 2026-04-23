export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Category {
    id: string;
    name: string;
}

export interface CategoryState {
    data: Category[];
    apiStatus: ApiStatus;
}