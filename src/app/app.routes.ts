import { Routes } from '@angular/router';
import { authGuard } from './components/auth/auth.guard';
import { publicGuard } from './components/auth/public.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () => import('./components/product-list/product-list.component'),
  },

  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('./components/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('./components/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./components/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
