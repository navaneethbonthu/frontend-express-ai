
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';


export const publicGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated$.pipe(
        take(1),
        map((isAuth) => {
            if (isAuth) {
                // UX: If already logged in, redirect to the admin dashboard
                return router.createUrlTree(['/admin']);
            } else {
                // UX: If not logged in, allow them to see the login page
                return true;
            }
        })
    );
};


