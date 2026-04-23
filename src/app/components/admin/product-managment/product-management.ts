import { Component, signal, inject, OnInit, ChangeDetectionStrategy, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelComponent } from '../overlay-panel.component';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { ProductListService } from '../../product-list/product-list.service';
import { Product } from '../../product-list/interfaces';
import { switchMap } from 'rxjs';
import { ProductTable } from '../product-table/product-table';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayPanelComponent,
    AddProductFormComponent,
    ProductTable
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: 'product-managment.scss',
  templateUrl: 'product-management.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProductManagementComponent implements OnInit {
  protected readonly productListService = inject(ProductListService);

  // UI State Signals
  showAddProductPanel = signal(false);
  editingProduct = signal<Product | null>(null);


  constructor() {
    /**
     * OPTIONAL: Reactive UI Logic
     * If the API call is successful, automatically close the overlay.
     * This reacts to the Service's status signal.
     */
    effect(() => {
      if (this.productListService._Status() === 'success' && this.showAddProductPanel()) {
        this.closeAddProductOverlay();
      }
    });
  }

  ngOnInit() {
    // Initialize with default filters
    this.productListService.setSearch('');
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productListService.setSearch(searchTerm);
  }

  openAddProductOverlay(productToEdit: Product | null = null) {
    this.editingProduct.set(productToEdit);
    this.showAddProductPanel.set(true);
  }

  closeAddProductOverlay() {
    this.showAddProductPanel.set(false);
    this.editingProduct.set(null);
  }

  onProductAdded(productPayload: any) {
    if (!productPayload) {
      this.closeAddProductOverlay();
      return;
    }

    const currentEditingProduct = this.editingProduct();

    if (currentEditingProduct) {
      // Logic for Update
      this.productListService.updateProduct(currentEditingProduct.id, productPayload);
    } else {
      // Logic for Add
      this.productListService.addProduct(productPayload);
    }

    // Note: We don't close the overlay here manually anymore. 
    // The effect() in the constructor handles closing it when the API succeeds.
  }
  onAdminDeleteProduct(productId: string) {
    this.productListService.deleteProduct(productId)
  }
}
