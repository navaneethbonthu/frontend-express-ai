import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListComponent {
  protected productListService = inject(ProductListService);

  selectedCategory = signal<string>('All');

  categories = computed(() => {
    const products = this.productListService._Products();
    const cats = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  });

  filteredProducts = computed(() => {
    const products = this.productListService._Products();
    const category = this.selectedCategory();
    if (category === 'All') {
      return products;
    }
    return products.filter((p) => p.category === category);
  });

  constructor() {
    this.productListService.getAllProducts();
  }

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
