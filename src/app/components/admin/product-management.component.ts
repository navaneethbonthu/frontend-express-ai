import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelComponent } from './overlay-panel.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { ProductListService } from '../product-list/product-list.service';

@Component({
  selector: 'app-product-management',
  template: `
    <div class="product-management-container">
      <h2>Product Management</h2>

      <button class="add-product-button" (click)="openAddProductOverlay()">Add New Product</button>

      <div class="product-list-section">
        <h3>Existing Products</h3>
        <p>List of products will go here.</p>
        <!-- This is where a table or list of products would be displayed -->
      </div>
    </div>
    @if (showAddProductPanel()) {
      <app-overlay-panel
        [isVisible]="showAddProductPanel()"
        title="Add New Product"
        (close)="closeAddProductOverlay()"
      >
        <app-add-product-form (productAdded)="onProductAdded($event)"></app-add-product-form>
      </app-overlay-panel>
    }
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
  imports: [CommonModule, ReactiveFormsModule, OverlayPanelComponent, AddProductFormComponent],
})
export class ProductManagementComponent {
  productListService = inject(ProductListService);
  showAddProductPanel = signal(false);

  openAddProductOverlay() {
    this.showAddProductPanel.set(true);
  }

  closeAddProductOverlay() {
    this.showAddProductPanel.set(false);
  }

  onProductAdded(newProduct: any) {
    if (newProduct) {
      console.log('Product received from overlay:', newProduct);
      // this.productListService.createProduct(newProduct);
    }
    this.closeAddProductOverlay();
  }
}
