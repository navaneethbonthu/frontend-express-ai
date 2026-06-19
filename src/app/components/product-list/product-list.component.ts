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
import { CategoryService } from '../category-list/category-list.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, CustomUpperCasePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListComponent implements OnInit {
  protected productListService = inject(ProductListService);
  protected CategoryService = inject(CategoryService);
  public cartService = inject(CartService);

  selectedCategory = signal<string | null>(null);

  ngOnInit() {
    this.CategoryService.getAllCategories()
  }

  onCategoryChange(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    const categoryId = selectElement.value;
    this.productListService.setCategory(categoryId)
  }
  onSearchChanges(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.productListService.setSearch(val)

  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
