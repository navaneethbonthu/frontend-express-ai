import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiStatus, Category, Product, ProductResponse } from './interfaces';
import { catchError, EMPTY, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  getAllProducts() {
    this.products.update((val) => ({ ...val, apiStatus: 'loading' }));
    this.http
      .get<ProductResponse>(`${this.API}/products`)
      .pipe(
        // takeUntilDestroyed(),
        catchError(() => {
          this.products.update((val) => ({ ...val, apiStatus: 'error' }));
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.products.update(() => ({
          data: response.data,
          totalItems: response.pagination.totalItems,
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          itemsPerPage: response.pagination.itemsPerPage,
          apiStatus: 'success',
        }));
        console.log(this._Products(), response);
      });
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
        })
      )
      .subscribe((response) => {
        this.categories.update(() => ({ data: response, apiStatus: 'success' }));
      });
  }
}
