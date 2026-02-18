import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(AuthService);
  // const token = authService.getToken();

  // If we have a token, clone the request and add the Authorization header
  const authReq = req.clone({
    // setHeaders: {
    //   Authorization: `Bearer ${token}`,
    //   userId: authService.currentUserSubject$.value?.id || '',
    // },

    withCredentials: true,

  });
  return next(authReq);
  // if (token) {
  // }

  // If no token, just pass the original request through
  // return next(req);
};
