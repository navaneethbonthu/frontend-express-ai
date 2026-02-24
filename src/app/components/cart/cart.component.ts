import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartService } from './cart.service';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  styleUrl: 'cart.component.scss',
  templateUrl: 'cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  public cartService = inject(CartService);
  removeItem(productId: string) {
    this.cartService.remoCartItem(productId);
  }
  updateQuantity(productId: string, change: number) {
    const currentItems = this.cartService.cartItems();
    const item = currentItems.find((i) => i.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + change);
    }
  }
}
