import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelComponent } from './overlay-panel.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { ProductListService } from '../product-list/product-list.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayPanelComponent,
    AddProductFormComponent,
    CurrencyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-management-container">
      <header class="management-header">
        <h2>Product Management</h2>
        <button class="btn btn-primary" (click)="openAddProductOverlay()">
          <span class="icon">+</span> Add New Product
        </button>
      </header>

      <div class="search-filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          (input)="onSearch($event)"
          class="form-control"
        />
      </div>

      <div class="product-list-section">
        @if (productListService._ApiStatus() === 'loading') {
          <div class="loading-state">Loading products...</div>
        } @else if (productListService._ApiStatus() === 'error') {
          <div class="error-state">Failed to load products.</div>
        } @else {
          <table class="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (product of productListService._Products(); track product.id) {
                <tr>
                  <td>{{ product.name }}</td>
                  <td>{{ product.category.name }}</td>
                  <td>{{ product.price | currency }}</td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn btn-icon btn-edit" title="Edit" (click)="openAddProductOverlay(product)">✏️</button>
                      <button class="btn btn-icon btn-delete" title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="4" class="empty-state">No products found.</td>
                </tr>
              }
            </tbody>
          </table>
        }
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

      .search-filter-bar {
        margin-bottom: 20px;

        .form-control {
          width: 100%;
          max-width: 400px;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;

          &:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
          }
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
          &:hover {
            background-color: #2980b9;
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

      .product-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;

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

        tbody tr:hover {
          background-color: #fcfcfc;
        }
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

      .error-state {
        color: #e74c3c;
      }
    `,
  ],
})
export class ProductManagementComponent implements OnInit {
  productListService = inject(ProductListService);
  showAddProductPanel = signal(false);

  ngOnInit() {
    this.productListService.getAllProducts();
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productListService.getAllProducts('', searchTerm);
  }

  openAddProductOverlay(item: any = null) {
    const updatedProduct = { ...item }
    console.log('clicked item:', updatedProduct);
    this.showAddProductPanel.set(true);
  }

  closeAddProductOverlay() {
    this.showAddProductPanel.set(false);
  }

  onProductAdded(newProduct: any) {
    if (newProduct) {
      this.productListService.addProduct(newProduct).subscribe({
        next: () => {
          this.productListService.getAllProducts();
        },
      });
    }
    this.closeAddProductOverlay();
  }
}
