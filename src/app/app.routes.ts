import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./components/product-list/product-list.component'),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./components/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./components/category-list/category-list.component').then(
        (m) => m.CategoryListComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./components/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/auth.component').then((m) => m.AuthComponent),
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES) },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
