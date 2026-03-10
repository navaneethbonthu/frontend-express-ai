import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component'),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./product-managment/product-management').then((m) => m.ProductManagementComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./category-managment/category-management').then((m) => m.CategoryManagementComponent),
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
];
