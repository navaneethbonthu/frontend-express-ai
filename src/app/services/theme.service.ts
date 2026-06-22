import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { from } from 'rxjs';

type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    private platformId = inject(PLATFORM_ID)

    private readonly STORAGE_KEY = 'user-theme'

    private document = inject(Document)

    theme = signal<Theme>(this.getInitialTheme())

    constructor() {

        effect(() => {
            const currentTheme = this.theme();
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem(this.STORAGE_KEY, currentTheme)
                const htmlElement = this.document.documentElement
                if (currentTheme === 'dark') {
                    htmlElement.classList.add('dark-mode')
                } else {
                    htmlElement.classList.remove('dark-mode')
                }
            }
        })
    }

    toggleTheme() {
        this.theme.update((state) => (state === 'light' ? 'light' : 'dark'))
    }

    private getInitialTheme() {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.STORAGE_KEY) as Theme || 'light'
        }

        return 'light'
    }

}