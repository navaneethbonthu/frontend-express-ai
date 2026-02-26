import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { ApiStatus, Category, Product, ProductResponse } from './interfaces';
import { catchError, EMPTY, Observable, Subject, switchMap, takeUntil, tap, timer, retry, map } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ProductListService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private API = '/api';

  // --- 1. STATE SIGNALS ---
  // Store current filters in a signal so polling always uses the latest values
  private currentFilters = signal<{ categoryId: string; search: string; page: number; limit: number }>({
    categoryId: '',
    search: '',
    page: 1,
    limit: 10
  });

  // Main State for Products
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

  // --- 2. SELECTORS (Computed) ---
  public readonly _Products = computed(() => this.productsState().data);
  public readonly _TotalItems = computed(() => this.productsState().pagination.totalItems);
  public readonly _CurrentPage = computed(() => this.productsState().pagination.currentPage);
  public readonly _TotalPages = computed(() => this.productsState().pagination.totalPages);
  public readonly _ApiStatus = computed(() => this.productsState().apiStatus);

  public readonly _Categories = computed(() => this.categoriesState().data);
  public readonly _CategoriesApiStatus = computed(() => this.categoriesState().apiStatus);

  // --- 3. POLLING CONTROL ---
  private stopPolling$ = new Subject<void>();
  private socket: Socket;


  constructor() {
    // Start polling immediately when service is initialized
    this.startLiveUpdates();
    this.getAllCategories(); // Fetch categories once on load

    this.socket = io(this.API);
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('product:created', (newProduct) => {
      this.productsState.update((state) => ({
        ...state,
        data: [newProduct, ...state.data],
        pagination: { ...state.pagination, totalItems: state.pagination.totalPages + 1 },
      }))
    })


    this.socket.on("product: deleted", (deltedId: string) => {
      this.productsState.update((state) => ({
        ...state,
        data: state.data.filter(product =>
          product.id !== deltedId,
        ),
        pagination: { ...state.pagination, totalItems: state.pagination.totalItems - 1 }
      }))
    })


    this.socket.on('product: updated', (updatedProduct) => {
      this.productsState.update((state) => ({
        ...state,
        data: state.data.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      }))
    })

  }

  // --- 4. CORE POLLING LOGIC ---
  private startLiveUpdates() {
    // Timer emits 0 immediately, then every 30 seconds
    timer(0, 30000)
      .pipe(
        takeUntil(this.stopPolling$),
        tap(() => this.productsState.update(s => ({ ...s, apiStatus: 'loading' }))),
        // SwitchMap cancels previous request if new 30s timer hits OR if filters change
        switchMap(() => this.fetchProductsFromApi().pipe(
          retry(2), // Retry failed requests twice before erroring
          catchError((error) => {
            console.error('Polling Error:', error);
            this.productsState.update(s => ({ ...s, apiStatus: 'error' }));
            return EMPTY; // Keep the observable alive
          })
        )),

      )
      .subscribe((response) => {
        if (response) {
          this.productsState.set({
            data: response.data,
            pagination: response.pagination,
            apiStatus: 'success',
          });
        }
      });
  }

  private fetchProductsFromApi(): Observable<ProductResponse> {
    const filters = this.currentFilters();
    let params = new HttpParams()
      .set('page', filters.page)
      .set('limit', filters.limit);

    if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters.search) params = params.set('search', filters.search);

    return this.http.get<ProductResponse>(`${this.API}/products`, { params });
  }

  stopLiveUpdates() {
    this.stopPolling$.next();
  }

  // --- 5. PUBLIC METHODS ---

  // Instead of fetching manually, we update the filter signal.
  // The polling logic (switchMap) detects this and fetches immediately.
  updateFilters(categoryId: string | null = '', search: string = '', page: number = 1) {
    this.currentFilters.update(current => ({
      ...current,
      categoryId: categoryId || '',
      search: search || '',
      page: page
    }));
    // We restart polling to force an immediate fetch without waiting 30s
    this.stopLiveUpdates();
    this.startLiveUpdates();
  }

  addProduct(newProduct: any): Observable<any> {
    return this.http.post(`${this.API}/products`, newProduct).pipe(
      tap(() => {
        // Force refresh immediately after add
        this.updateFilters(this.currentFilters().categoryId, this.currentFilters().search);
      })
    );
  }

  updateProduct(productId: string | number, updatedProduct: Product) {
    console.log('update product apis');

    return this.http.patch(`${this.API}/products/${productId}`, updatedProduct).pipe(
      tap(() => {
        // Force refresh immediately after update
        this.updateFilters(this.currentFilters().categoryId, this.currentFilters().search);
      })
    );
  }

  deleteProduct(productId: string) {
    console.log('deleteProduct', `${this.API}/products/${productId}`);

    this.http.delete(`${this.API}/products/${productId}`).pipe(
      tap(() => this.updateFilters(this.currentFilters().categoryId))
    ).subscribe()
  }

  getAllCategories() {
    this.categoriesState.update(s => ({ ...s, apiStatus: 'loading' }));
    this.http.get<Category[]>(`${this.API}/categories`)
      .pipe(
        catchError(() => {
          this.categoriesState.update(s => ({ ...s, apiStatus: 'error' }));
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.categoriesState.set({ data: response, apiStatus: 'success' });
      });
  }

  addCategory(categoryData: { name: string }): Observable<Category> {
    // console.log('addCategory called');
    // 1. Make the POST request to your backend
    return this.http.post<Category>(`${this.API}/categories`, categoryData).pipe(
      tap((newCategory) => {
        // 2. OPTIONAL: Update the local signal state immediately 
        // so you don't have to wait for the next getAllCategories() call.
        this.categoriesState.update(state => ({
          ...state,
          data: [...state.data, newCategory]
        }));

      }),
      catchError((error) => {
        console.error('Error adding category:', error);
        throw error;
      })
    );
  }


  deleteCategory(catorgyId: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/categories/${catorgyId}`).pipe(
      tap(() => {
        this.categoriesState.update((state) => ({
          ...state,
          data: state.data.filter(item => item.id !== catorgyId)
        }))
      }),
      catchError(() => {
        this.categoriesState.update(s => ({ ...s, apiStatus: 'error' }));
        return EMPTY;
      })
    )

  }


  updateCategory(id: string, category: { name: string }): Observable<Category> {
    console.log('updateCategory called');

    return this.http.post<Category>(`${this.API}/categories/${id}`, { category }).pipe(
      tap((updatedCategory) => {
        this.categoriesState.update((state) => ({
          ...state,
          data: state.data.map(c => c.id === id ? updatedCategory : c)
        }))
      })
    )
  }
  ngOnDestroy() {
    this.stopLiveUpdates();
    this.socket.disconnect();
  }
}