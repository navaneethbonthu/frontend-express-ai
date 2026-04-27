import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)

  // If we have a token, clone the request and add the Authorization header
  const authReq = req.clone({
    // setHeaders: {
    //   Authorization: `Bearer ${token}`,
    //   userId: authService.currentUserSubject$.value?.id || '',
    // },

    withCredentials: true,

  });
  return next(authReq).pipe(
    catchError((error) => {
      // If we get a 401 and it's not from the refresh call itself
      if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes('/refresh')) {
        return authService.refreshAccessToken().pipe(
          switchMap(() => next(authReq)), // Retry the original request
          catchError((refreshErr) => {
            authService.logout(); // If refresh fails, user must log in again
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );


};

