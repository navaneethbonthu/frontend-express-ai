import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.currentUser()) {
    return true;
  }
  // Not logged in? Redirect to login
  return router.createUrlTree(['/login']);

  // return authService.isAuthenticated.pipe(
  //   take(1),
  //   map((isAuth) => {
  //     if (isAuth) {
  //       return true; // Allow access
  //     } else {
  //       // Redirect to login if not authenticated
  //       return router.createUrlTree(['/login']);
  //     }
  //   }),
  // );
};

