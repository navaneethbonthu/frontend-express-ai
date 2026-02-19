import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { authInterceptor } from './components/auth/auth.interceptor';
import { AuthService } from './components/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { GlobalErrorHandler } from './handlers/error-hadler';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { xsrfInterceptor } from './interceptors/xsrf.interceptor';

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
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',     // Backend cookieName
        headerName: 'x-xsrf-token',   // Backend getCsrfTokenFromRequest
      })
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

      console.log('App starting: Fetching CSRF and User...');

      // Return a Promise (Angular waits for this to resolve)
      return lastValueFrom(authService.checkAuth());
    }),

  ],
};
