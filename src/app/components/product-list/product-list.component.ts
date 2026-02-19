import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
  effect,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { ProductListService } from './product-list.service';
import { Product } from './interfaces';
import { CartService } from '../cart/cart.service';
import StarRatting from '../star-ratting/star-ratting';
import { CustomUpperCasePipe } from '../../pipes/uppercase-pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage, StarRatting, CustomUpperCasePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListComponent implements OnInit {
  protected productListService = inject(ProductListService);
  title: string = 'Our Products';

  category = signal<string | null>(null);
  selectedCategory = computed(() => this.category());
  cartList = signal<Product[]>([]);
  searchQuery = signal<string>(''); // New Signal

  public cartService = inject(CartService);

  constructor() {
    // this.productListService.getAllProducts();
    this.productListService.updateFilters('', '');
    this.productListService.getAllCategories();
    effect(() => {
      const currentCategory = this.category();
      // this.productListService.getAllProducts(currentCategory, this.searchQuery());
      this.productListService.updateFilters(currentCategory, this.searchQuery());
    });
  }

  ngOnInit() {
    // console.log('Categories:', this.productListService._Categories());
  }

  onCategoryChange(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    const categoryId = selectElement.value;
    this.category.set(categoryId);
    console.log('Selected category:', categoryId);
  }
  onSearchChanges(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.searchQuery.set(val);
    console.log('Search Value:', val);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
