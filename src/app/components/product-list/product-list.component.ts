import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
  effect,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { ProductListService } from './product-list.service';
import { Product } from './interfaces';
import { CartService } from '../cart/cart.service';
import StarRatting from '../star-ratting/star-ratting';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage, StarRatting],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListComponent {
  protected productListService = inject(ProductListService);

  category = signal<string | null>(null);
  selectedCategory = computed(() => this.category());
  cartList = signal<Product[]>([]);

  public cartService = inject(CartService);

  constructor() {
    this.productListService.getAllProducts();
    this.productListService.getAllCategories();
    effect(() => {
      const currentCategory = this.category();
      this.productListService.getAllProducts(currentCategory);
    });
  }

  onCategoryChange(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    const categoryId = selectElement.value;
    this.category.set(categoryId);
    console.log('Selected category:', categoryId);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
