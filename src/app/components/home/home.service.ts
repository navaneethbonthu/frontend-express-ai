import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { computed, DestroyRef, inject, Injectable, signal } from "@angular/core"
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { State } from "@ngrx/store";
import { Observable, of, delay, Subject, BehaviorSubject, switchMap, map, catchError, throwError, single, EMPTY, debounceTime, distinctUntilChanged, tap, take } from "rxjs"
export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
}

type apiStatus = 'idle' | 'loding' | 'success' | 'error'

export interface Filter {
    categoryId: string,
    search: string,
    page: number,
    limit: number
}

export interface ProductResponse {
    data: Product[];
    pagination: {
        totalItems: number;
        currentPage: number;
        totalPages: number;
        itemsPerPage: number;
    };
}
@Injectable({
    providedIn: 'root',
})

export class HomeService {


    // states

    private productState = signal<{
        data: Product[],
        pagination: { totalItems: number, currentPage: number, totalPages: number, itemsPerPage: number },
        apiStatus: apiStatus,
    }>(
        {
            data: [],
            pagination: { totalItems: 0, currentPage: 0, totalPages: 0, itemsPerPage: 0 },
            apiStatus: 'idle'
        }
    )

    filter = signal<{ categoryId: string, search: string, page: number, limit: number }>(
        { categoryId: '', search: '', page: 1, limit: 10 }
    )

    // selectors

    public readonly _Products = computed(() => this.productState().data);

    public readonly _TotalItems = computed(() => this.productState().pagination.totalItems);

    public readonly _CurrentPage = computed(() => this.productState().pagination.currentPage);

    public readonly _TotalPages = computed(() => this.productState().pagination.totalPages);

    public readonly _ItemsPerPage = computed(() => this.productState().pagination.itemsPerPage);

    public readonly _ApiStatus = computed(() => this.productState().apiStatus)

    // ----------

    private http = inject(HttpClient)
    private readonly API = '/api';
    private destroy$ = inject(DestroyRef);


    constructor() {
        toObservable(this.filter).pipe(
            debounceTime(200),
            distinctUntilChanged((prev, current) => JSON.stringify(prev) === JSON.stringify(current)),
            tap(() => this.productState.update((state) => ({ ...state, apiStatus: 'loding' }))),
            switchMap((filter) => {
                return this.featchProducts(filter)
            }),
            takeUntilDestroyed(this.destroy$),
            catchError(() => {
                this.productState.update((state) => {
                    return { ...state, apiStatus: 'error' }
                })
                return EMPTY
            })
        ).subscribe((res) => {
            this.productState.update((s) => ({
                data: res.data,
                pagination: res.pagination,
                apiStatus: 'success',
            }));
        })
    }

    private featchProducts(filter: Filter): Observable<ProductResponse> {

        let params = new HttpParams().set('page', filter.page).set('limit', filter.limit)

        if (filter.categoryId) params = params.set('categoryId', filter.categoryId);
        if (filter.search) params = params.set('search', filter.search);


        return this.http.get<ProductResponse>(`${this.API}/products`, { params }).pipe(
            catchError(() => {
                this.productState.update((state) => ({ ...state, apiStatus: 'error' }))
                // Show Toast
                return EMPTY;
            })
        );
    }

    setSearch(search: string) {
        this.filter.update((state) => ({ ...state, search }))
    }

    setCategory(categoryId: string) {
        this.filter.update((filter: Filter) => ({ ...filter, categoryId, page: 1 }));
    }

    setPage(page: number) {
        this.filter.update((filter: Filter) => ({ ...filter, page }));
    }


    addProduct(newProduct: Product) {
        this.productState.update((s) => ({ ...s, apiStatus: 'loding' }));
        this.http.post<Product>(`${this.API}/product`, newProduct).pipe(
            takeUntilDestroyed(this.destroy$),
            catchError(() => {
                this.productState.update((state) => ({ ...state, apiStatus: 'error' }))
                return EMPTY;
            })

        ).subscribe((res) => {
            this.productState.update((state) => ({
                ...state,
                data: [...state.data, newProduct],
                apiStatus: 'success'
            }))
        })
    }

    updateCategory(productId: string | number, updateProduct: Partial<Product>) {
        this.productState.update((state) => ({ ...state, apiStatus: 'loding' }))

        this.http.post<Product>(`${this.API}/products${productId}`, updateProduct).pipe(
            takeUntilDestroyed(this.destroy$),
            catchError(() => {
                this.productState.update((state) => ({ ...state, apiStatus: 'error' }))
                return EMPTY;
            })
        ).subscribe((res) => {
            this.productState.update((state) => ({
                ...state,
                data: state.data.map((item) => {
                    return item.id === updateProduct.id ? { ...item, ...updateProduct } : item
                }),
                apiStatus: 'success',
            }))
        })
    }

    deleteProduct(productId: string | number, deletedProduct: Product) {
        this.productState.update((state) => ({ ...state, apiStatus: 'loding' }))
        this.http.delete<Product>(`${this.API}/products/deletedProductId`,).pipe(
            takeUntilDestroyed(this.destroy$),
            catchError(() => {
                this.productState.update((state) => ({ ...state, apiStatus: 'error' }))
                return EMPTY
            })
        ).subscribe((res) => {
            this.productState.update((state) => ({
                ...state,
                data: state.data.filter((item) => item.id !== productId),
                pagination: {
                    ...state.pagination,
                    totalItems: state.pagination.totalItems - 1
                },
                apiStatus: 'success',
            }))
        })

    }





}