import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OverlayPanelComponent } from './overlay-panel.component';

@Component({
  selector: 'app-product-management',
  template: `
    <div class="product-management-container">
      <h2>Product Management</h2>

      <button class="add-product-button" (click)="toggleAddProductPanel()">Add New Product</button>

      @if (showAddProductPanel()) {
        <div class="overlay-panel">
          <h3>Add Product</h3>
          <form [formGroup]="addProductForm" (ngSubmit)="onAddProduct()">
            <div class="form-group">
              <label for="productName">Product Name:</label>
              <input id="productName" type="text" formControlName="name" />
              @if (addProductForm.get('name')?.invalid && addProductForm.get('name')?.touched) {
                <span class="error-message">Product name is required.</span>
              }
            </div>
            <div class="form-group">
              <label for="productPrice">Price:</label>
              <input id="productPrice" type="number" formControlName="price" />
              @if (addProductForm.get('price')?.invalid && addProductForm.get('price')?.touched) {
                <span class="error-message">Price is required and must be a positive number.</span>
              }
            </div>
            <div class="form-group">
              <label for="productDescription">Description:</label>
              <textarea id="productDescription" formControlName="description"></textarea>
            </div>
            <div class="form-group">
              <label for="productCategory">Category:</label>
              <select id="productCategory" formControlName="category">
                <option value="">--Select Category--</option>
                @for (category of categories(); track category.id) {
                  <option [value]="category.id">{{ category.name }}</option>
                }
              </select>
              @if (
                addProductForm.get('category')?.invalid && addProductForm.get('category')?.touched
              ) {
                <span class="error-message">Category is required.</span>
              }
            </div>
            <div class="form-actions">
              <button type="submit" [disabled]="addProductForm.invalid">Add Product</button>
              <button type="button" (click)="toggleAddProductPanel()">Cancel</button>
            </div>
          </form>
        </div>
      }

      <div class="product-list-section">
        <h3>Existing Products</h3>
        <p>List of products will go here.</p>
        <!-- This is where a table or list of products would be displayed -->
      </div>
    </div>
  `,
  styles: [
    `
      .product-management-container {
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

      .add-product-button {
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

      .add-product-button:hover {
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

      .form-group input[type='text'],
      .form-group input[type='number'],
      .form-group textarea,
      .form-group select {
        width: calc(100% - 20px);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }

      .form-group textarea {
        resize: vertical;
        min-height: 80px;
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

      .product-list-section {
        margin-top: 40px;
        border-top: 1px solid #eee;
        padding-top: 30px;
      }

      .product-list-section h3 {
        color: #333;
        margin-bottom: 20px;
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OverlayPanelComponent],
})
export class ProductManagementComponent {
  fb = inject(FormBuilder);
  // Temporarily define inject until it's properly imported or polyfilled
  // if (typeof inject === 'undefined') {
  //   var inject = <T>(token: any) => new token();
  // }

  showAddProductPanel = signal(false);
  categories = signal<Array<{ id: string; name: string }>>([
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Books' },
    { id: '3', name: 'Clothing' },
  ]);

  addProductForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: [''],
    category: ['', Validators.required],
  });

  toggleAddProductPanel() {
    this.showAddProductPanel.update((value) => !value);
    if (!this.showAddProductPanel()) {
      this.addProductForm.reset();
    }
  }

  onAddProduct() {
    if (this.addProductForm.valid) {
      console.log('Product Added:', this.addProductForm.value);
      this.toggleAddProductPanel();
    } else {
      this.addProductForm.markAllAsTouched();
    }
  }
}
