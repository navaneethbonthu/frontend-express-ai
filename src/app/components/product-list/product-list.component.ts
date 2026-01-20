import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage, JsonPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListComponent {
  protected productListService = inject(ProductListService);

  category = signal<string>('All');
  selectedCategory = computed(() => this.category());

  constructor() {
    this.productListService.getAllProducts();
    this.productListService.getAllCategories();
  }

  onCategoryChange(e: Event) {
    const category = (e.target as HTMLSelectElement).value;
    this.category.set(category);
  }
}
