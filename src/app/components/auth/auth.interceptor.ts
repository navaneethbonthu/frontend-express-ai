import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, filter, switchMap, take, tap, throwError } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req.clone({ withCredentials: true })).pipe(
    catchError((error) => {
      // 1. Is it a 401?
      const is401 = error instanceof HttpErrorResponse && error.status === 401;
      // 2. Is it a request we SHOULD NOT try to refresh?
      const isAuthRequest = req.url.includes('login') || req.url.includes('refresh') || req.url.includes('logout');

      if (is401 && !isAuthRequest) {

        // --- QUEUE LOGIC FOR ROTATION ---
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshAccessToken().pipe(
            tap(() => console.log('refreshtoken api calling')),
            switchMap(() => {
              isRefreshing = false;
              refreshTokenSubject.next(true);
              return next(req);
            }),
            catchError((refreshErr) => {
              isRefreshing = false;
              refreshTokenSubject.next(false);

              // --- THE "SILENT GUEST" CHECK ---
              // If we are at startup (checking /me) and refresh fails,
              // DO NOT call logout() (which redirects). Just throw the error.
              if (!req.url.includes('/me')) {
                console.log('Session expired during active usage. Redirecting...');
                authService.logout();
              }

              return throwError(() => refreshErr);
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter(res => res !== null),
            take(1),
            switchMap(success => success ? next(req) : throwError(() => error))
          );
        }
      }

      return throwError(() => error);
    })
  );
};

