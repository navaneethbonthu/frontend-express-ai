import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, inject, isDevMode, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { authInterceptor } from './components/auth/auth.interceptor';
import { AuthService } from './components/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { GlobalErrorHandler } from './handlers/error-hadler';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { encryptionInterceptor } from './interceptors/encryption.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './components/ngrx-cart/cart.reducer';
import { appReducers } from './app.reducer';

// function initializeApp(authService: AuthService) {
//   return () => {
//     return lastValueFrom(authService.checkAuth()).then((res) => {
//       console.log('APP_INITIALIZER: Auth check finished', res); // DEBUG LOG
//     }).catch(err => {
//       console.log('APP_INITIALIZER: Auth check failed', err); // DEBUG LOG
//     });
//   };
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },


    provideHttpClient(
      withInterceptors([authInterceptor, ErrorInterceptor]), // Register it here
      // encryptionInterceptor,

      withXsrfConfiguration({
        cookieName: 'X-CSRF-TOKEN',     // Backend cookieName
        headerName: 'x-csrf-token',   // Backend getCsrfTokenFromRequest
      })

      // 1. Register the NgRx Store and your reducers

    ),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeApp,
    //   deps: [AuthService],
    //   multi: true,
    // }

    provideAppInitializer(() => {
      // Use inject() to get your service
      const authService = inject(AuthService);

      console.log('App starting now: Fetching CSRF and User...');

      // Return a Promise (Angular waits for this to resolve)
      return lastValueFrom(authService.checkAuth())
        .then(user => {
          console.log('Session restored successfully.,', user);
          // Session restored successfully
        })
        .catch(err => {
          // 1. Log the reason (for debugging)
          console.log('Initialization: No active session found.');

          // 2. Set the state so the UI knows to show "Login"
          authService.currentUser.set(null);

          // 3. IMPORTANT: Return a value (like null or true)
          // This "resolves" the promise so Angular knows it's safe to start.
          return null;

        });
    }),

    provideStore(appReducers),

    // 2. Register DevTools (Only runs in development mode)
    provideStoreDevtools({
      maxAge: 25, // Keeps track of the last 25 actions
      logOnly: !isDevMode(),
    })

  ],
};
