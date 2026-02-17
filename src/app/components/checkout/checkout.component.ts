import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container">
      <h1 class="section-title">Checkout</h1>

      <div class="checkout-layout">
        <div class="checkout-form">
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
            <section class="form-section">
              <h3>Shipping Information</h3>
              <div class="grid-2">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" formControlName="firstName" class="form-input" />
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" formControlName="lastName" class="form-input" />
                </div>
              </div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" formControlName="address" class="form-input" />
              </div>
              <div class="grid-3">
                <div class="form-group">
                  <label>City</label>
                  <input type="text" formControlName="city" class="form-input" />
                </div>
                <div class="form-group">
                  <label>State</label>
                  <input type="text" formControlName="state" class="form-input" />
                </div>
                <div class="form-group">
                  <label>Zip Code</label>
                  <input type="text" formControlName="zip" class="form-input" />
                </div>
              </div>
            </section>

            <section class="form-section">
              <h3>Payment Method</h3>
              <div class="payment-options">
                <label class="payment-option">
                  <input type="radio" name="payment" value="card" checked />
                  <span class="option-content">
                    <span class="option-title">Credit Card</span>
                    <span class="option-desc">Safe and secure payment</span>
                  </span>
                </label>
                <label class="payment-option">
                  <input type="radio" name="payment" value="paypal" />
                  <span class="option-content">
                    <span class="option-title">PayPal</span>
                    <span class="option-desc">Fast and easy checkout</span>
                  </span>
                </label>
              </div>

              <div class="card-details">
                <div class="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" class="form-input" />
                </div>
                <div class="grid-2">
                  <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="XXX" class="form-input" />
                  </div>
                </div>
              </div>
            </section>

            <button type="submit" class="btn btn-primary btn-block place-order-btn">
              Place Order
            </button>
          </form>
        </div>

        <div class="order-summary">
          <div class="summary-card">
            <h3>Your Order</h3>
            <div class="order-items">
              <div class="order-item">
                <span>Premium Wireless Headphones × 1</span>
                <span>$299.99</span>
              </div>
              <div class="order-item">
                <span>Minimalist Leather Backpack × 2</span>
                <span>$259.98</span>
              </div>
            </div>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>$559.97</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>$559.97</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .checkout-layout {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 3rem;
        align-items: flex-start;

        @media (max-width: 992px) {
          grid-template-columns: 1fr;
        }
      }

      .form-section {
        background-color: var(--surface-color);
        padding: 2rem;
        border-radius: var(--border-radius-lg);
        border: 1px solid var(--border-color);
        margin-bottom: 2rem;

        h3 {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
      }

      .form-group {
        margin-bottom: 1.5rem;

        label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }
      }

      .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-md);
        font-family: inherit;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
      }

      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      .grid-3 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
      }

      .payment-options {
        display: grid;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .payment-option {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.25rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-md);
        cursor: pointer;
        transition: all 0.2s ease;

        &:has(input:checked) {
          border-color: var(--primary-color);
          background-color: rgba(37, 99, 235, 0.05);
        }

        input {
          margin-top: 0.25rem;
        }

        .option-title {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
        }
        .option-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      }

      .place-order-btn {
        padding: 1rem;
        font-size: 1.125rem;
      }

      .summary-card {
        background-color: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: 2rem;
        position: sticky;
        top: 100px;

        h3 {
          margin-bottom: 1.5rem;
        }
      }

      .order-items {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-color);
      }

      .order-item {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        margin-bottom: 0.75rem;
        color: var(--text-secondary);
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
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);

  checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
  });

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Order placed', this.checkoutForm.value);
      alert('Order placed successfully!');
    }
  }
}
