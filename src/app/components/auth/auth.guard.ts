import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.currentUser()) {
    return true;
  } else {
    return false;
  }

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
