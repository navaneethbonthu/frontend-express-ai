import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiStatus, Category } from './interface';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private readonly http = inject(HttpClient);
    private readonly destroyRef$ = inject(DestroyRef);
    private readonly API = '/api/categories';

    // --- PRIVATE STATE ---
    private readonly categoriesState = signal<{
        data: Category[];
        apiStatus: ApiStatus
    }>({
        data: [],
        apiStatus: 'idle',
    });

    // --- PUBLIC SELECTORS ---
    public readonly _Categories = computed(() => this.categoriesState().data);
    public readonly _Status = computed(() => this.categoriesState().apiStatus);

    // --- ACTIONS ---

    getAllCategories() {
        this.categoriesState.update((s) => ({ ...s, apiStatus: 'loading' }));
        this.http.get<Category[]>(this.API)
            .pipe(
                takeUntilDestroyed(this.destroyRef$),
                catchError(() => {
                    this.categoriesState.update(s => ({ ...s, apiStatus: 'error' }))
                    // Raise default toster here if it posible
                    return EMPTY;
                })
            )
            .subscribe(
                (res) => this.categoriesState.set({ data: res, apiStatus: 'success' })
            );
    }

    addCategory(categoryData: { name: string }) {
        this.categoriesState.update((s) => ({ ...s, apiStatus: 'loading' }));
        this.http.post<Category>(this.API, categoryData)
            .pipe(
                takeUntilDestroyed(this.destroyRef$),
                catchError(() => {
                    this.categoriesState.update(s => ({ ...s, apiStatus: 'error' }))
                    // Raise default toster here if it posible
                    return EMPTY;
                })
            )
            .subscribe((newCat) => this.categoriesState.update((s) => ({
                ...s,
                data: [...s.data, newCat],
                apiStatus: 'success'
            }))
            );
    }

    updateCategory(id: string, categoryData: { name: string }) {
        this.categoriesState.update((s) => ({ ...s, apiStatus: 'loading' }));
        this.http.patch<Category>(`${this.API}/${id}`, categoryData)
            .pipe(
                takeUntilDestroyed(this.destroyRef$),
                catchError(() => {
                    this.categoriesState.update(s => ({ ...s, apiStatus: 'error' }))
                    // Raise default toster here if it posible
                    return EMPTY;
                })
            ).subscribe(
                (updated) => this.categoriesState.update((s) => ({
                    ...s,
                    data: s.data.map((c) => (c.id === id ? updated : c)),
                    apiStatus: 'success'
                }))
            );



    }
    deleteCategory(categoryId: string) {
        this.categoriesState.update((s) => ({ ...s, apiStatus: 'loading' }));
        this.http.delete<void>(`${this.API}/${categoryId}`)
            .pipe(
                takeUntilDestroyed(this.destroyRef$),
                catchError(() => {
                    this.categoriesState.update(s => ({ ...s, apiStatus: 'error' }))
                    // Raise default toster here if it posible
                    return EMPTY;
                })
            )
            .subscribe(() => this.categoriesState.update((s) => ({
                ...s,
                data: s.data.filter((c) => c.id !== categoryId),
                apiStatus: 'success'
            }))
            );
    }

}

