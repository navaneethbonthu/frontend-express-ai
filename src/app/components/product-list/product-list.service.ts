import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { ApiStatus, Product, ProductResponse } from './interfaces';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductListService implements OnDestroy {
  private readonly http = inject(HttpClient);

  private readonly API = '/api';

  // --- 1. STATE SIGNALS ---


  private productsState = signal<{
    data: Product[];
    pagination: { totalItems: number; currentPage: number; totalPages: number; itemsPerPage: number };
    apiStatus: ApiStatus;
  }>({
    data: [],
    pagination: { totalItems: 0, currentPage: 1, totalPages: 0, itemsPerPage: 10 },
    apiStatus: 'idle',
  });



  // private currentFilters = signal({ categoryId: '', search: '', page: 1, limit: 10 });
  private readonly filters = signal({ categoryId: '', search: '', page: 1, limit: 10 });

  // --- 2. SELECTORS ---
  public readonly _Products = computed(() => this.productsState().data);
  public readonly _TotalItems = computed(() => this.productsState().pagination.totalItems);
  public readonly _ApiStatus = computed(() => this.productsState().apiStatus);




  constructor() {
    /**
     * REACTIVE DATA STREAM
     * Whenever 'filters' changes (Search, Category, or Page), 
     * this stream automatically triggers a fresh API call.
     */
    toObservable(this.filters)
      .pipe(
        debounceTime(300), // Wait for user to stop typing
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        tap(() => this.productsState.update((s) => ({ ...s, apiStatus: 'loading' }))),
        switchMap((f) => this.fetchProducts(f)),
        takeUntilDestroyed(),
        catchError(() => {
          this.productsState.update(s => ({ ...s, apiStatus: 'error' }))
          // Raise default toster here if it posible
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.productsState.update((s) => ({
          data: res.data,
          pagination: res.pagination,
          apiStatus: 'success',
        }));
      });
  }

  setSearch(search: string) {
    this.filters.update((f) => ({ ...f, search, page: 1 }));
  }

  setCategory(categoryId: string) {
    this.filters.update((f) => ({ ...f, categoryId, page: 1 }));
  }

  setPage(page: number) {
    this.filters.update((f) => ({ ...f, page }));
  }

  private fetchProducts(f: any): Observable<ProductResponse> {
    let params = new HttpParams().set('page', f.page).set('limit', f.limit);
    if (f.categoryId) params = params.set('categoryId', f.categoryId);
    if (f.search) params = params.set('search', f.search);

    return this.http.get<ProductResponse>(`${this.API}/products`, { params }).pipe(
      catchError((err) => {
        console.error('Fetch Error:', err);
        return EMPTY;
      })
    );
  }


  // --- 3. API METHODS (REST) ---


  addProduct(newProduct: Partial<Product>) {
    this.productsState.update((s) => ({ ...s, apiStatus: 'loading' }));

    this.http.post<Product>(`${this.API}/products`, newProduct)
      .pipe(takeUntilDestroyed(),
        catchError(() => {
          this.productsState.update(s => ({ ...s, apiStatus: 'error' }))
          // Raise default toster here if it posible
          return EMPTY;
        })
      ) // Use short-lived pipe or convert to promise if preferred
      .subscribe((product) => {
        // Update state: Add the new product to the top of the list locally
        this.productsState.update((state) => ({
          ...state,
          data: [product, ...state.data],
          apiStatus: 'success',
        }));
      },);
  }


  updateProduct(productId: string | number, updatedData: Partial<Product>) {
    // Set status to loading
    this.productsState.update((s) => ({ ...s, apiStatus: 'loading' }));

    this.http
      .patch<Product>(`${this.API}/products/${productId}`, updatedData)
      .pipe(takeUntilDestroyed(),
        catchError(() => {
          this.productsState.update(s => ({ ...s, apiStatus: 'error' }))
          // Raise default toster here if it posible
          return EMPTY;
        }))
      .subscribe((updatedProduct) => {
        this.productsState.update((state) => ({
          ...state,
          // Replace only the specific product in the array
          data: state.data.map((p) => (p.id === productId ? updatedProduct : p)),
          apiStatus: 'success',
        }));
        console.log('Product updated successfully');
      },);
  }


  deleteProduct(productId: string | number) {
    this.productsState.update((s) => ({ ...s, apiStatus: 'loading' }));

    this.http
      .delete(`${this.API}/products/${productId}`)
      .pipe(takeUntilDestroyed(),
        catchError(() => {
          this.productsState.update(s => ({ ...s, apiStatus: 'error' }))
          // Raise default toster here if it posible
          return EMPTY;
        }))
      .subscribe({
        next: () => {
          this.productsState.update((state) => ({
            ...state,
            // Remove the product from the local list
            data: state.data.filter((p) => p.id !== productId),
            // Update total count in pagination
            pagination: {
              ...state.pagination,
              totalItems: state.pagination.totalItems - 1,
            },
            apiStatus: 'success',
          }));
          console.log('Product deleted successfully');
        },
        error: (err) => {
          this.productsState.update((s) => ({ ...s, apiStatus: 'error' }));
          console.error('Delete failed', err);
        },
      });
  }



  ngOnDestroy() {
    // this.socket.disconnect();
  }
}