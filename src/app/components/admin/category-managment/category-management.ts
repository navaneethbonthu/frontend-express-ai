import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OverlayPanelComponent } from '../overlay-panel.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductListService } from '../../product-list/product-list.service';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { Category } from '../../product-list/interfaces';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OverlayPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: 'category-management.html',
  styleUrl: 'category-management.scss'
})
export class CategoryManagementComponent implements OnInit {
  fb = inject(FormBuilder);
  productListService = inject(ProductListService);

  showAddCategoryPanel = signal(false);
  editingCategory = signal<Category | null>(null);

  addCategoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  ngOnInit() {
    this.productListService.getAllCategories();
  }

  toggleAddCategoryPanel() {
    this.showAddCategoryPanel.update((value) => !value);
    if (!this.showAddCategoryPanel()) {
      this.addCategoryForm.reset();
    }
  }

  onAddCategory() {
    if (this.addCategoryForm.valid && this.addCategoryForm.value) {
      const categoryData = this.addCategoryForm.value;

      const id = this.editingCategory()?.id;

      // 1. Determine which observable to use
      const request$ = id
        ? this.productListService.updateCategory(id, categoryData as { name: string })
        : this.productListService.addCategory(categoryData as { name: string })

      // 2. Execute the request
      request$.subscribe({
        next: () => {
          this.toggleAddCategoryPanel();
          // this.productListService.getAllCategories();
        },
        error: () => {
          alert('Operation failed')
          // this.toggleAddCategoryPanel();
        }
      });

      // In a real app, you'd call a service to add category
    } else {
      this.addCategoryForm.markAllAsTouched();
    }
  }


  deleteCategory(categoryId: string) {
    this.productListService.deleteCategory(categoryId).subscribe()
  }

  editCategory(category: Category) {
    this.editingCategory.set(category);
    this.addCategoryForm.patchValue({ name: category.name });
    this.toggleAddCategoryPanel(); // Open the form
  }
}
