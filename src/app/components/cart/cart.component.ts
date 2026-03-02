import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartService } from './cart.service';
import { Subject, takeUntil } from 'rxjs';

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
export class CartComponent implements OnInit {
  public cartService = inject(CartService);
  heavyData: string[] = [];
  private destroy$ = new Subject<void>();
  ngOnInit() {

    this.cartService.dataStream$.pipe(takeUntil(this.destroy$)).subscribe(val => {


      this.heavyData.push(`Data-${val}`);

      console.log(`[LeakingComponent] Alive and eating memory... ${val}`);
    });
  }

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

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }


}
