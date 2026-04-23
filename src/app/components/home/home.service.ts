import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { computed, inject, Injectable, signal } from "@angular/core"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { State } from "@ngrx/store";
import { Observable, of, delay, Subject, BehaviorSubject, switchMap, map, catchError, throwError, single, EMPTY } from "rxjs"
export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
}

type apiStatus = 'idel' | 'loding' | 'success' | 'error'
@Injectable({
    providedIn: 'root',
})

export class HomeService {


    // states

    private productState = signal<{
        data: Product[],
        pagination: { totalItems: number, currentPage: number, totalPages: number, itemPerPage: number },
        apiStatus: apiStatus,
    }>(
        {
            data: [],
            pagination: { totalItems: 0, currentPage: 0, totalPages: 0, itemPerPage: 0 },
            apiStatus: 'idel'
        }
    )

    currentFilters = signal<{ categoryId: string, search: string, page: number, limit: number }>(
        { categoryId: '', search: '', page: 1, limit: 10 }
    )

    // selectors

    public readonly _Products = computed(() => this.productState().data);

    public readonly _TotalItems = computed(() => this.productState().pagination.totalItems);

    public readonly _CurrentPage = computed(() => this.productState().pagination.currentPage);

    public readonly _TotalPages = computed(() => this.productState().pagination.totalPages);

    public readonly _ItemsPerPage = computed(() => this.productState().pagination.itemPerPage);

    public readonly _ApiStatus = computed(() => this.productState().apiStatus)

    // ----------

    private http = inject(HttpClient)
    private readonly API = '/api';


    constructor() {
        this.getAllPorudcts()
    }

    getAllPorudcts() {
        this.productState.update(state => ({ ...state, apiStatus: 'loding' }));

        const filter = this.currentFilters();

        let params = new HttpParams().set('page', filter.page).set('limit', filter.limit)

        if (filter.categoryId) {
            params = params.set('categoryId', filter.categoryId)
        }
        if (filter.search) {
            params = params.set('search', filter.search);
        }


        this.http.get<any>(`${this.API}\products`, { params }).pipe(
            takeUntilDestroyed(),
            catchError(() => {
                this.productState.update(state => ({ ...state, apiStatus: 'error' }))
                // show toast for with error message
                return EMPTY
            })
        ).subscribe((res) => {
            this.productState.update((state) => ({
                ...state,
                data: res.data,
                pagination: res.pagination,
                apiStatus: 'success',

            }))
        })
    }


    updateFilters(categoryId: string | null = ' ', search: string = '', page: number = 1) {
        this.currentFilters.update((state) => ({
            ...state,
            categoryId: categoryId || '',
            search: search || '',
            page: page
        }))
        this.getAllPorudcts();
    }





}