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
  template: `
    <div class="container">
      <h1 class="section-title">Your Cart</h1>

      @if (cartService.totalCount() > 0) {
        <div class="cart-layout">
          <div class="cart-items">
            <div class="cart-header">
              <span class="col-product">Product</span>
              <span class="col-price">Price</span>
              <span class="col-quantity">Quantity</span>
              <span class="col-total">Total</span>
              <span class="col-action"></span>
            </div>

            @for (item of cartService.cartItems(); track item.id) {
              <div class="cart-item">
                <div class="col-product product-cell">
                  <div class="product-image">
                    <img [src]="item.imageUrl" [alt]="item.name" width="80" height="80" />
                  </div>
                  <div class="product-info">
                    <h3 class="product-name">{{ item.name }}</h3>
                    <span class="product-sku">SKU: SS-{{ item.id }}</span>
                  </div>
                </div>
                <div class="col-price">
                  <span class="mobile-label">Price:</span>
                  {{ item.price | currency }}
                </div>
                <div class="col-quantity">
                  <span class="mobile-label">Qty:</span>
                  <div class="quantity-controls">
                    <button (click)="updateQuantity(item.id, -1)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button (click)="updateQuantity(item.id, 1)">+</button>
                  </div>
                </div>
                <div class="col-total">
                  <span class="mobile-label">Total:</span>
                  {{ item.price * item.quantity | currency }}
                </div>
                <div class="col-action">
                  <button class="remove-btn" (click)="removeItem(item.id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            }
          </div>

          <div class="cart-summary">
            <div class="summary-card">
              <h3>Order Summary</h3>
              <div class="summary-row">
                <span>Subtotal</span>
                <span>{{ cartService.totalPrice() | currency }}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="summary-row">
                <span>Tax</span>
                <span>No Tax</span>
              </div>
              <div class="summary-total">
                <span>Total</span>
                <span>{{ cartService.totalPrice() | currency }}</span>
              </div>
              <button class="btn btn-primary btn-block checkout-btn" routerLink="/checkout">
                Proceed to Checkout
              </button>
              <a routerLink="/products" class="continue-shopping">Continue Shopping</a>
            </div>
          </div>
        </div>
      } @else {
        <div class="empty-cart">
          <div class="empty-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path
                d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
              />
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <a routerLink="/products" class="btn btn-primary">Start Shopping</a>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .cart-layout {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 2rem;
        align-items: flex-start;

        @media (max-width: 992px) {
          grid-template-columns: 1fr;
        }
      }

      .cart-header {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr 50px;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--border-color);
        font-weight: 600;
        color: var(--text-secondary);
        font-size: 0.875rem;
        text-transform: uppercase;

        @media (max-width: 768px) {
          display: none;
        }
      }

      .cart-item {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr 50px;
        padding: 1.5rem 0;
        border-bottom: 1px solid var(--border-color);
        align-items: center;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          gap: 1rem;
          position: relative;
        }
      }

      .product-cell {
        display: flex;
        gap: 1.5rem;
        align-items: center;

        .product-image {
          width: 80px;
          height: 80px;
          background-color: #f1f5f9;
          border-radius: var(--border-radius-md);
          overflow: hidden;
        }

        .product-name {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .product-sku {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      }

      .mobile-label {
        display: none;
        font-weight: 600;
        color: var(--text-secondary);
        margin-right: 0.5rem;

        @media (max-width: 768px) {
          display: inline-block;
        }
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        border: 1px solid var(--border-color);
        width: fit-content;
        border-radius: var(--border-radius-sm);
        padding: 0.25rem;

        button {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border-radius: 4px;
          &:hover {
            background: var(--border-color);
          }
        }
      }

      .remove-btn {
        color: var(--text-muted);
        &:hover {
          color: var(--error-color);
        }

        @media (max-width: 768px) {
          position: absolute;
          top: 1.5rem;
          right: 0;
        }
      }

      .summary-card {
        background-color: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-sm);

        h3 {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
        }
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        color: var(--text-secondary);
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 2px solid var(--border-color);
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 2rem;
      }

      .btn-block {
        width: 100%;
      }

      .checkout-btn {
        padding: 1rem;
        font-size: 1rem;
      }

      .continue-shopping {
        display: block;
        text-align: center;
        margin-top: 1rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
        &:hover {
          color: var(--primary-color);
        }
      }

      .empty-cart {
        text-align: center;
        padding: 4rem 0;

        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        h2 {
          margin-bottom: 0.5rem;
        }
        p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  public cartService = inject(CartService);
  removeItem(productId: number) {
    this.cartService.remoCartItem(productId);
  }
  updateQuantity(productId: number, change: number) {
    const currentItems = this.cartService.cartItems();
    const item = currentItems.find((i) => i.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + change);
    }
  }
}
