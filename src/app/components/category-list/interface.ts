export interface Category {
    id: string;
    name: string;
    createdAt: string; // Added this field based on your JSON
    _count?: {
        products: number;
    };
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';