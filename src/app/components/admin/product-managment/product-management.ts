import { Component, signal, inject, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
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
  productListService = inject(ProductListService);
  showAddProductPanel = signal(false);
  editingProduct = signal<Product | null>(null);

  ngOnInit() {
    // this.productListService.getAllProducts();
    this.productListService.updateFilters('', '');
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    // this.productListService.getAllProducts('', searchTerm);
    this.productListService.updateFilters(null, searchTerm);
  }

  openAddProductOverlay(productToEdit: Product | null = null) {
    this.editingProduct.set(productToEdit);
    this.showAddProductPanel.set(true);
  }

  closeAddProductOverlay() {
    this.showAddProductPanel.set(false);
    this.editingProduct.set(null); // Reset editing product on close
  }

  onProductAdded(productPayload: any) {
    if (!productPayload) {
      this.closeAddProductOverlay();
      return;
    }

    const currentEditingProduct = this.editingProduct();
    const isEdit = !!currentEditingProduct;
    let operation$;

    if (isEdit && currentEditingProduct) {
      operation$ = this.productListService.updateProduct(currentEditingProduct.id, productPayload);
    } else {
      operation$ = this.productListService.addProduct(productPayload);
    }

    operation$.subscribe({
      next: () => {
        // this.productListService.getAllProducts();
        this.productListService.updateFilters('', '');
        this.closeAddProductOverlay();
      },
      error: (err) => {
        console.error(`Failed to ${isEdit ? 'update' : 'add'} product:`, err);
        // TODO: Implement user-facing error notification
      },
    });
  }

  onAdminDeleteProduct(productId: string) {
    this.productListService.deleteProduct(productId).subscribe(
      {
        next: () => {
          this.productListService.updateFilters('', '');
        },
        error: (err) => {
          console.error(`Failed to load products:`, err);
        },
      }
    );
  }
}
