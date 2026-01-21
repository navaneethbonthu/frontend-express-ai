import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../product-list/interfaces';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems = signal<CartItem[]>([]);
  public items = this.cartItems.asReadonly();
  public totalPrice = computed(() =>
    this.items().reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  public totalCount = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));

  addToCart(product: Product) {
    console.log('Adding to cart:', product);
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        // Update quantity immutably (Senior Requirement)
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      // Add new item
      return [...items, { ...product, quantity: 1 }];
    });
  }

  remoCartItem(productId: number) {
    this.cartItems.update((items) => items.filter((item) => item.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartItems.update((items) =>
      items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    );
  }
}
