export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image?: string;
  description?: string;
  // add other fields...
}

export interface Pagination {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface ProductResponse {
  data: Product[];
  pagination: Pagination;
}

export interface Filter {
  categoryId: string;
  search: string;
  page: number;
  limit: number;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';
export interface ProductState {
  data: Product[];
  pagination: Pagination;
  apiStatus: ApiStatus;
}

export interface FormValues {
  name: string;
  price: number;
  description: string;
  category: string;
}
