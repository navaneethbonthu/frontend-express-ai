import { Component, signal, inject } from '@angular/core';
import { OverlayPanelComponent } from './overlay-panel.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-management',
  template: `
    <div class="category-management-container">
      <h2>Category Management</h2>

      <button class="add-category-button" (click)="toggleAddCategoryPanel()">
        Add New Category
      </button>

      @if (showAddCategoryPanel()) {
        <app-overlay-panel
          [isVisible]="showAddCategoryPanel()"
          title="Add Category"
          (close)="toggleAddCategoryPanel()"
        >
          <form [formGroup]="addCategoryForm" (ngSubmit)="onAddCategory()">
            <div class="form-group">
              <label for="categoryName">Category Name:</label>
              <input id="categoryName" type="text" formControlName="name" />
              @if (addCategoryForm.get('name')?.invalid && addCategoryForm.get('name')?.touched) {
                <span class="error-message">Category name is required.</span>
              }
            </div>
            <div class="form-actions">
              <button type="submit" [disabled]="addCategoryForm.invalid">Add Category</button>
              <button type="button" (click)="toggleAddCategoryPanel()">Cancel</button>
            </div>
          </form>
        </app-overlay-panel>
      }

      <div class="category-list-section">
        <h3>Existing Categories</h3>
        <p>List of categories will go here.</p>
        <!-- This is where a table or list of categories would be displayed -->
      </div>
    </div>
  `,
  styles: [
    `
      .category-management-container {
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
      }

      h2 {
        color: #333;
        text-align: center;
        margin-bottom: 25px;
      }

      .add-category-button {
        display: block;
        margin: 0 auto 30px auto;
        padding: 12px 25px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      .add-category-button:hover {
        background-color: #218838;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #555;
      }

      .form-group input[type='text'] {
        width: calc(100% - 20px);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }

      .error-message {
        color: #dc3545;
        font-size: 14px;
        margin-top: 5px;
        display: block;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 25px;
      }

      .form-actions button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      .form-actions button[type='submit'] {
        background-color: #007bff;
        color: white;
      }

      .form-actions button[type='submit']:hover {
        background-color: #0056b3;
      }

      .form-actions button[type='button'] {
        background-color: #6c757d;
        color: white;
      }

      .form-actions button[type='button']:hover {
        background-color: #5a6268;
      }

      .category-list-section {
        margin-top: 40px;
        border-top: 1px solid #eee;
        padding-top: 30px;
      }

      .category-list-section h3 {
        color: #333;
        margin-bottom: 20px;
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OverlayPanelComponent],
})
export class CategoryManagementComponent {
  fb = inject(FormBuilder);

  showAddCategoryPanel = signal(false);
  categories = signal<Array<{ id: string; name: string }>>([
    { id: 'cat1', name: 'Electronics' },
    { id: 'cat2', name: 'Books' },
    { id: 'cat3', name: 'Clothing' },
  ]);

  addCategoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  toggleAddCategoryPanel() {
    this.showAddCategoryPanel.update((value) => !value);
    if (!this.showAddCategoryPanel()) {
      this.addCategoryForm.reset();
    }
  }

  onAddCategory() {
    if (this.addCategoryForm.valid) {
      console.log('Category Added:', this.addCategoryForm.value);
      // In a real app, you'd add this to your categories signal or a service
      this.toggleAddCategoryPanel();
    } else {
      this.addCategoryForm.markAllAsTouched();
    }
  }
}
