import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./product-management/product-management.component').then(
            (m) => m.ProductManagementComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./category-management/category-management.component').then(
            (m) => m.CategoryManagementComponent
          ),
      },
    ],
  },
];
