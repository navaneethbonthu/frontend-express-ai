import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, DestroyRef, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiStatus, Category, CategoryState } from './interface';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private readonly http = inject(HttpClient);
    private readonly destroyRef$ = inject(DestroyRef);
    private readonly API = '/api/categories';

    // --- 1. PRIVATE STATE (Strictly Typed) ---
    private readonly categoriesState = signal<CategoryState>({
        data: [],
        apiStatus: 'idle',
    });

    // --- 2. PUBLIC SELECTORS (Explicit Signal Types) ---
    public readonly categories: Signal<Category[]> = computed(() => this.categoriesState().data);
    public readonly status: Signal<ApiStatus> = computed(() => this.categoriesState().apiStatus);



    // --- 3. ACTIONS ---

    /**
     * Fetches all categories from the server
     */
    public getAllCategories(): void {
        this.updateStatus('loading');

        this.http.get<Category[]>(this.API)
            .pipe(
                takeUntilDestroyed(this.destroyRef$),
                catchError(() => this.handleError())
            )
            .subscribe((res: Category[]) => {
                this.categoriesState.set({
                    data: res,
                    apiStatus: 'success'
                });
            });
    }

    /**
     * Adds a new category
     * @param categoryData Object containing the category name
     */
    public addCategory(categoryData: Pick<Category, 'name'>): void {
        this.updateStatus('loading');

        this.http.post<Category>(this.API, categoryData)
            .pipe(
                takeUntilDestroyed(this.destroyRef$),
                catchError(() => this.handleError())
            )
            .subscribe((newCat: Category) => {
                this.categoriesState.update((state) => ({
                    ...state,
                    data: [...state.data, newCat],
                    apiStatus: 'success'
                }));
            });
    }

    /**
     * Updates an existing category via PATCH
     */
    public updateCategory(id: string, categoryData: Partial<Category>): void {
        this.updateStatus('loading');

        this.http.patch<Category>(`${this.API}/${id}`, categoryData)
            .pipe(
                takeUntilDestroyed(this.destroyRef$),
                catchError(() => this.handleError())
            )
            .subscribe((updated: Category) => {
                this.categoriesState.update((state) => ({
                    ...state,
                    data: state.data.map((c) => (c.id === id ? updated : c)),
                    apiStatus: 'success'
                }));
            });
    }

    /**
     * Deletes a category by ID
     */
    public deleteCategory(categoryId: string): void {
        this.updateStatus('loading');

        this.http.delete<void>(`${this.API}/${categoryId}`)
            .pipe(
                takeUntilDestroyed(this.destroyRef$),
                catchError(() => this.handleError())
            )
            .subscribe(() => {
                this.categoriesState.update((state) => ({
                    ...state,
                    data: state.data.filter((c) => c.id !== categoryId),
                    apiStatus: 'success'
                }));
            });
    }


    // --- 4. PRIVATE HELPERS ---

    /**
     * Internal helper to update the API status signal
     */
    private updateStatus(apiStatus: ApiStatus): void {
        this.categoriesState.update((s) => ({ ...s, apiStatus }));
    }

    /**
     * Centralized error handler for the service
     */
    private handleError(): Observable<never> {
        this.updateStatus('error');
        // Place for Global Toast Notification service call
        console.error('Category operation failed');
        return EMPTY;
    }


}

