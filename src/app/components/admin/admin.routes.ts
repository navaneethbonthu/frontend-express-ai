import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component'),
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadComponent: () =>
          import('./product-management.component').then((m) => m.ProductManagementComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./category-management.component').then((m) => m.CategoryManagementComponent),
      },
    ],
  },
];
