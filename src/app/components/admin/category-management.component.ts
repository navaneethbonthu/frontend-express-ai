import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OverlayPanelComponent } from './overlay-panel.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductListService } from '../product-list/product-list.service';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OverlayPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="category-management-container">
      <header class="management-header">
        <h2>Category Management</h2>
        <button class="btn btn-primary" (click)="toggleAddCategoryPanel()">
          <span class="icon">+</span> Add New Category
        </button>
      </header>

      <div class="category-list-section">
        @if (productListService._CategoriesApiStatus() === 'loading') {
          <div class="loading-state">Loading categories...</div>
        } @else if (productListService._CategoriesApiStatus() === 'error') {
          <div class="error-state">Failed to load categories.</div>
        } @else {
          <table class="category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (category of productListService._Categories(); track category.id) {
                <tr>
                  <td>{{ category.id }}</td>
                  <td>{{ category.name }}</td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn btn-icon btn-edit" title="Edit Category">✏️</button>
                      <button class="btn btn-icon btn-delete" title="Delete Category">🗑️</button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="3" class="empty-state">No categories found.</td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>

    @if (showAddCategoryPanel()) {
      <app-overlay-panel
        [isVisible]="showAddCategoryPanel()"
        title="Add Category"
        (close)="toggleAddCategoryPanel()"
      >
        <form [formGroup]="addCategoryForm" (ngSubmit)="onAddCategory()">
          <div class="form-group">
            <label for="categoryName">Category Name</label>
            <input
              id="categoryName"
              type="text"
              formControlName="name"
              class="form-control"
              placeholder="e.g. Electronics"
              [class.is-invalid]="
                addCategoryForm.get('name')?.invalid && addCategoryForm.get('name')?.touched
              "
            />
            @if (addCategoryForm.get('name')?.invalid && addCategoryForm.get('name')?.touched) {
              <span class="error-message">Category name is required.</span>
            }
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="toggleAddCategoryPanel()">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" [disabled]="addCategoryForm.invalid">
              Add Category
            </button>
          </div>
        </form>
      </app-overlay-panel>
    }
  `,
  styles: [
    `
      .category-management-container {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        padding: 24px;
      }

      .management-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #2c3e50;
        }
      }

      .category-table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          text-align: left;
          padding: 15px;
          border-bottom: 1px solid #eee;
        }

        th {
          font-weight: 600;
          color: #7f8c8d;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
        }
      }

      .btn {
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;

        &-primary {
          background-color: #3498db;
          color: white;
          &:hover:not(:disabled) {
            background-color: #2980b9;
          }
          &:disabled {
            background-color: #bdc3c7;
            cursor: not-allowed;
          }
        }

        &-secondary {
          background-color: #95a5a6;
          color: white;
          &:hover {
            background-color: #7f8c8d;
          }
        }

        &-icon {
          background: none;
          padding: 5px;
          font-size: 1.1rem;
          &:hover {
            background-color: #f5f5f5;
          }
        }
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;

        label {
          font-weight: 500;
          color: #2c3e50;
          font-size: 14px;
        }

        .form-control {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;

          &:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
          }

          &.is-invalid {
            border-color: #e74c3c;
            &:focus {
              box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.1);
            }
          }
        }
      }

      .error-message {
        color: #e74c3c;
        font-size: 12px;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 24px;
      }

      .action-buttons {
        display: flex;
        gap: 10px;
      }

      .empty-state,
      .loading-state,
      .error-state {
        text-align: center;
        padding: 40px;
        color: #7f8c8d;
      }
    `,
  ],
})
export class CategoryManagementComponent implements OnInit {
  fb = inject(FormBuilder);
  productListService = inject(ProductListService);

  showAddCategoryPanel = signal(false);

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
    if (this.addCategoryForm.valid) {
      // In a real app, you'd call a service to add category
      // this.productListService.addCategory(this.addCategoryForm.value).subscribe(...)
      this.toggleAddCategoryPanel();
      this.productListService.getAllCategories();
    } else {
      this.addCategoryForm.markAllAsTouched();
    }
  }
}
