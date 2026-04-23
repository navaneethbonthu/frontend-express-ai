import { Component, signal, inject, OnInit, ChangeDetectionStrategy, effect } from '@angular/core';
import { OverlayPanelComponent } from '../overlay-panel.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../category-list/interface';
import { CategoryService } from '../../category-list/category-list.service';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OverlayPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'category-management.html',
  styleUrl: 'category-management.scss'
})
export class CategoryManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected readonly categoryService = inject(CategoryService);

  // UI State Signals
  showAddCategoryPanel = signal(false);
  editingCategory = signal<Category | null>(null);

  addCategoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor() {
    /**
     * REACTIVE UI SIDE-EFFECT
     * Automatically close the panel and reset form when the service 
     * successfully completes an add or update operation.
     */
    effect(() => {
      if (this.categoryService._Status() === 'success' && this.showAddCategoryPanel()) {
        this.closeAndReset();
      }
    });
  }

  ngOnInit() {
    // Load categories on init
    this.categoryService.getAllCategories();
  }

  toggleAddCategoryPanel() {
    if (this.showAddCategoryPanel()) {
      this.closeAndReset();
    } else {
      this.showAddCategoryPanel.set(true);
    }
  }

  private closeAndReset() {
    this.showAddCategoryPanel.set(false);
    this.editingCategory.set(null);
    this.addCategoryForm.reset();
  }

  onAddCategory() {
    if (this.addCategoryForm.invalid) {
      this.addCategoryForm.markAllAsTouched();
      return;
    }

    const categoryData = { name: this.addCategoryForm.value.name as string };
    const id = this.editingCategory()?.id;

    if (id) {
      // Logic for Update
      this.categoryService.updateCategory(id, categoryData);
    } else {
      // Logic for Create
      this.categoryService.addCategory(categoryData);
    }

    // Note: We don't subscribe or toggle panel here. 
    // The constructor's effect() handles the closing on success.
  }

  deleteCategory(categoryId: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId);
    }
  }

  editCategory(category: Category) {
    this.editingCategory.set(category);
    this.addCategoryForm.patchValue({ name: category.name });
    this.showAddCategoryPanel.set(true);
  }
}