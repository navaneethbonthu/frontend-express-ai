import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, DestroyRef, inject, Injectable, OnDestroy, Signal, signal } from '@angular/core';
import { ApiStatus, Filter, Pagination, Product, ProductResponse, ProductState } from './interfaces';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly API = '/api/products'; // Specific endpoint


  // --- 1. STATE SIGNALS ---

  private readonly productsState = signal<ProductState>({
    data: [],
    pagination: { totalItems: 0, currentPage: 1, totalPages: 0, itemsPerPage: 10 },
    apiStatus: 'idle',
  });

  private readonly filters = signal<Filter>({
    categoryId: '',
    search: '',
    page: 1,
    limit: 10
  });

  // --- 2. SELECTORS (Read-only for Components) ---

  public readonly products: Signal<Product[]> = computed(() => this.productsState().data);
  public readonly totalItems: Signal<number> = computed(() => this.productsState().pagination.totalItems);
  public readonly apiStatus: Signal<ApiStatus> = computed(() => this.productsState().apiStatus);
  public readonly currentFilters: Signal<Filter> = computed(() => this.filters());
  public readonly pagination: Signal<Pagination> = computed(() => this.productsState().pagination);


  constructor() {
    /**
     * REACTIVE DATA STREAM
     * Whenever 'filters' changes (Search, Category, or Page), 
     * this stream automatically triggers a fresh API call.
     */
    toObservable(this.filters)
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        tap(() => this.productsState.update((s) => ({ ...s, apiStatus: 'loading' }))),
        switchMap((filter: Filter) =>
          this.fetchProducts(filter).pipe(
            catchError((err) => {
              this.productsState.update((s) => ({ ...s, apiStatus: 'error' }));
              return EMPTY; // Keeps the main stream alive
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe((res: ProductResponse) => {
        this.productsState.update((state) => ({
          ...state,
          data: res.data,
          pagination: res.pagination,
          apiStatus: 'success',
        }));
      });

  }

  // --- 3. PUBLIC ACTIONS ---

  public setSearch(search: string): void {
    this.filters.update((f) => ({ ...f, search, page: 1 }));
  }

  public setCategory(categoryId: string): void {
    this.filters.update((f) => ({ ...f, categoryId, page: 1 }));
  }

  public setPage(page: number): void {
    this.filters.update((f) => ({ ...f, page }));
  }

  // --- 5. PRIVATE HELPERS ---

  private fetchProducts(filter: Filter): Observable<ProductResponse> {
    let params = new HttpParams()
      .set('page', filter.page.toString())
      .set('limit', filter.limit.toString());

    if (filter.categoryId) params = params.set('categoryId', filter.categoryId);
    if (filter.search) params = params.set('search', filter.search);

    return this.http.get<ProductResponse>(this.API, { params });
  }

  // --- 3. API METHODS (REST) ---

  public addProduct(newProduct: Partial<Product>): void {
    this.productsState.update((s) => ({ ...s, apiStatus: 'loading' }));

    this.http.post<Product>(this.API, newProduct)
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        catchError(() => {
          this.productsState.update((s) => ({ ...s, apiStatus: 'error' }))
          return EMPTY
        })
      )
      .subscribe((product: Product) => {
        this.productsState.update((state) => ({
          ...state,
          data: [product, ...state.data],
          pagination: { ...state.pagination, totalItems: state.pagination.totalItems + 1 },
          apiStatus: 'success',
        }));
      });
  }


  public updateProduct(productId: string, updatedData: Partial<Product>): void {
    this.productsState.update((s) => ({ ...s, apiStatus: 'loading' }))

    this.http.patch<Product>(`${this.API}/${productId}`, updatedData)
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        catchError(() => {
          this.productsState.update((s) => ({ ...s, apiStatus: 'error' }))
          return EMPTY
        })
      )
      .subscribe((updatedProduct: Product) => {
        this.productsState.update((state) => ({
          ...state,
          data: state.data.map((p) => (p.id === productId ? updatedProduct : p)),
          apiStatus: 'success',
        }));
      });
  }


  public deleteProduct(productId: string): void {
    this.productsState.update((s) => ({ ...s, apiStatus: 'loading' }));

    this.http.delete<void>(`${this.API}/${productId}`)
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        catchError(() => {
          this.productsState.update((s) => ({ ...s, apiStatus: 'error' }))
          return EMPTY
        })
      )
      .subscribe(() => {
        this.productsState.update((state) => ({
          ...state,
          data: state.data.filter((p) => p.id !== productId),
          pagination: { ...state.pagination, totalItems: state.pagination.totalItems - 1 },
          apiStatus: 'success',
        }));
      });
  }


}

