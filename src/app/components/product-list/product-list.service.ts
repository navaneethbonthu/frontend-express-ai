import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { ApiStatus, Category, Product, ProductResponse } from './interfaces';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ProductListService implements OnDestroy {
  private readonly http = inject(HttpClient);
  // Base URL for the Socket connection (adjust port if necessary)
  private readonly SOCKET_URL = 'http://localhost:3000';
  private readonly API = '/api';

  // private socket: Socket;

  // --- 1. STATE SIGNALS ---
  private currentFilters = signal({ categoryId: '', search: '', page: 1, limit: 10 });

  private productsState = signal<{
    data: Product[];
    pagination: { totalItems: number; currentPage: number; totalPages: number; itemsPerPage: number };
    apiStatus: ApiStatus;
  }>({
    data: [],
    pagination: { totalItems: 0, currentPage: 1, totalPages: 0, itemsPerPage: 10 },
    apiStatus: 'idle',
  });

  private categoriesState = signal<{ data: Category[]; apiStatus: ApiStatus }>({
    data: [],
    apiStatus: 'idle',
  });

  // --- 2. SELECTORS ---
  public readonly _Products = computed(() => this.productsState().data);
  public readonly _TotalItems = computed(() => this.productsState().pagination.totalItems);
  public readonly _ApiStatus = computed(() => this.productsState().apiStatus);
  public readonly _Categories = computed(() => this.categoriesState().data);

  constructor() {
    // 1. Initial Load of data
    this.getAllProducts();
    this.getAllCategories();

    // 2. Initialize Socket.io
    // this.socket = io(this.SOCKET_URL);
    // this.setupSocketListeners();
  }

  // private setupSocketListeners() {
  //   // Note: Ensure strings match your backend io.emit() strings exactly

  //   this.socket.on('product:created', (newProduct: Product) => {
  //     this.productsState.update((state) => ({
  //       ...state,
  //       data: [newProduct, ...state.data],
  //       pagination: {
  //         ...state.pagination,
  //         totalItems: state.pagination.totalItems + 1
  //       },
  //     }));
  //   });

  //   this.socket.on("product:deleted", (deletedId: string) => {
  //     this.productsState.update((state) => ({
  //       ...state,
  //       data: state.data.filter(p => p.id !== deletedId),
  //       pagination: {
  //         ...state.pagination,
  //         totalItems: state.pagination.totalItems - 1
  //       }
  //     }));
  //   });

  //   this.socket.on('product:updated', (updatedProduct: Product) => {
  //     this.productsState.update((state) => ({
  //       ...state,
  //       data: state.data.map(p => p.id === updatedProduct.id ? updatedProduct : p)
  //     }));
  //   });
  // }

  // --- 3. API METHODS (REST) ---

  getAllProducts() {
    this.productsState.update(s => ({ ...s, apiStatus: 'loading' }));

    const filters = this.currentFilters();
    let params = new HttpParams()
      .set('page', filters.page)
      .set('limit', filters.limit);

    if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters.search) params = params.set('search', filters.search);

    this.http.get<ProductResponse>(`${this.API}/products`, { params }).subscribe({
      next: (res) => this.productsState.set({
        data: res.data,
        pagination: res.pagination,
        apiStatus: 'success'
      }),
      error: () => this.productsState.update(s => ({ ...s, apiStatus: 'error' }))
    });
  }

  updateFilters(categoryId: string | null = '', search: string = '', page: number = 1) {
    this.currentFilters.update(current => ({
      ...current,
      categoryId: categoryId || '',
      search: search || '',
      page: page
    }));
    this.getAllProducts(); // Trigger fresh fetch when filters change
  }

  addProduct(newProduct: any): Observable<any> {
    return this.http.post(`${this.API}/products`, newProduct);
  }

  updateProduct(productId: string | number, updatedProduct: any): Observable<any> {
    return this.http.patch(`${this.API}/products/${productId}`, updatedProduct);
  }

  deleteProduct(productId: string): Observable<any> {
    console.log('deleteProduct called ', productId);

    return this.http.delete(`${this.API}/products/${productId}`);
  }

  // --- CATEGORY METHODS ---

  getAllCategories() {
    this.categoriesState.update(s => ({ ...s, apiStatus: 'loading' }));
    this.http.get<Category[]>(`${this.API}/categories`).subscribe({
      next: (res) => this.categoriesState.set({ data: res, apiStatus: 'success' }),
      error: () => this.categoriesState.update(s => ({ ...s, apiStatus: 'error' }))
    });
  }

  addCategory(categoryData: { name: string }): Observable<Category> {
    return this.http.post<Category>(`${this.API}/categories`, categoryData).pipe(
      tap((newCat) => this.categoriesState.update(s => ({
        ...s, data: [...s.data, newCat]
      })))
    );
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/categories/${categoryId}`).pipe(
      tap(() => this.categoriesState.update(s => ({
        ...s, data: s.data.filter(c => c.id !== categoryId)
      })))
    );
  }

  updateCategory(id: string, categoryData: { name: string }): Observable<Category> {
    // Changed to PATCH and fixed data structure to match industry standard
    return this.http.patch<Category>(`${this.API}/categories/${id}`, categoryData).pipe(
      tap((updated) => this.categoriesState.update(s => ({
        ...s, data: s.data.map(c => c.id === id ? updated : c)
      })))
    );
  }

  ngOnDestroy() {
    // this.socket.disconnect();
  }
}