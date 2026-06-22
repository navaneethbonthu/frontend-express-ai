import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, DOCUMENT, effect, inject, Injectable, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';


type Theme = 'light' | 'dark';


@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    private platformId = inject(PLATFORM_ID);
    private document = inject(DOCUMENT); // More "Angular" way to access document
    private readonly STORAGE_KEY = 'user-theme';

    destroy$ = inject(DestroyRef)

    // 1. Initialize Signal
    theme = signal<'light' | 'dark'>(this.getInitialTheme());

    constructor() {
        console.log('ThemeService Initialized');

        // 2. The Effect
        effect(() => {
            const currentTheme = this.theme();
            console.log('Effect triggered! Current theme is:', currentTheme);

            if (isPlatformBrowser(this.platformId)) {
                // Update Local Storage
                localStorage.setItem(this.STORAGE_KEY, currentTheme);
                this.applyThemeToDom(currentTheme)
            }
        });

        // 3. Listen for Storage events (Move logic from ngOnInit to constructor)

        if (isPlatformBrowser(this.platformId)) {
            fromEvent<StorageEvent>(window, 'storage').pipe(
                takeUntilDestroyed(this.destroy$),
            ).subscribe((event) => {
                if (event.key === this.STORAGE_KEY) {
                    const newTheme = event.newValue as Theme || 'light'
                    this.theme.set(newTheme);
                }
            })
        }


    }



    toggleTheme() {
        this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    }

    private getInitialTheme() {
        if (isPlatformBrowser(this.platformId)) {
            return (localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark') || 'light';
        }
        return 'light';
    }

    private applyThemeToDom(currentTheme: Theme) {
        const htmlElement = this.document.documentElement;
        if (currentTheme === 'dark') {
            htmlElement.classList.add('dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
        }

        console.log('HTML Classes:', htmlElement.className);
    }

}