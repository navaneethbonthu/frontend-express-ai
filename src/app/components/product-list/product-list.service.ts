import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiStatus, Category, Product, ProductResponse } from './interfaces';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private API = 'http://localhost:3000/api';

  // dependencies
  private readonly http = inject(HttpClient);

  //   intitial State
  private products = signal<{
    data: Product[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    apiStatus: ApiStatus;
  }>({
    data: [],
    totalItems: 0,
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 10,
    apiStatus: 'idle',
  });

  private categories = signal<{ data: Category[]; apiStatus: ApiStatus }>({
    data: [],
    apiStatus: 'idle',
  });

  // selectors
  public readonly _Products = computed(() => this.products().data);
  public readonly _TotalItems = computed(() => this.products().totalItems);
  public readonly _CurrentPage = computed(() => this.products().currentPage);
  public readonly _TotalPages = computed(() => this.products().totalPages);
  public readonly _ItemsPerPage = computed(() => this.products().itemsPerPage);
  public readonly _ApiStatus = computed(() => this.products().apiStatus);

  public readonly _Categories = computed(() => this.categories().data);
  public readonly _CategoriesApiStatus = computed(() => this.categories().apiStatus);

  getAllProducts(categoryId: string | null = '', search: string = '') {
    // 1. Set status to loading
    this.products.update((val) => ({ ...val, apiStatus: 'loading' }));

    // 2. Build Query Parameters
    let params = new HttpParams();

    // Only add categoryId to request if it's not empty and not "All"
    if (categoryId == '' || categoryId === null || !categoryId) {
      params = params.set('categoryId', '');
    } else {
      params = params.set('categoryId', categoryId);
    }

    if (search) {
      params = params.set('search', search);
    }

    // You can also add default pagination here if you want
    params = params.set('page', '1');
    params = params.set('limit', '10');

    // 3. Make the HTTP call with the params object
    this.http
      .get<ProductResponse>(`${this.API}/products`, { params })
      .pipe(
        catchError((error) => {
          console.error('Fetch error:', error);
          this.products.update((val) => ({ ...val, apiStatus: 'error' }));
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        // 4. Update state with the backend response
        this.products.set({
          data: response.data,
          totalItems: response.pagination.totalItems,
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          itemsPerPage: response.pagination.itemsPerPage,
          apiStatus: 'success',
        });
      });
  }

  addProduct(newProduct: any): Observable<any> {
    console.log('Adding product:', newProduct);
    return this.http.post(`${this.API}/products`, newProduct);
  }


  updateProduct(productId: string, updatedProduct: any): Observable<any> {
    console.log('Adding product:', updatedProduct);
    return this.http.put(`${this.API}/products/${productId}`, updatedProduct);
  }

  getAllCategories() {
    this.http
      .get<Category[]>(`${this.API}/categories`)
      .pipe(
        catchError((err) => {
          catchError(() => {
            this.categories.update((val) => ({ ...val, apiStatus: 'error' }));
            return EMPTY;
          });
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        this.categories.update(() => ({ data: response, apiStatus: 'success' }));
      });
  }
}
