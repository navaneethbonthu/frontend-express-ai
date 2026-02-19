export interface Product {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  price: number;
  rating: number;
  imageUrl: string;
  description?: string;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ProductResponse {
  data: Product[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
}

export interface Category {
  id: string;
  name: string;
  createdAt: string; // Added this field based on your JSON
  _count?: {
    products: number;
  };
}

export interface FormValues {
  name: string;
  price: number;
  description: string;
  category: string;
}
