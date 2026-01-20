export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
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
