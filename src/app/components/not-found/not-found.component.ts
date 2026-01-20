import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container error-container">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Oops! Page Not Found</h2>
        <p class="error-message">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <div class="error-actions">
          <a routerLink="/" class="btn btn-primary">Back to Home</a>
          <a routerLink="/products" class="btn btn-outline">Browse Products</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .error-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        text-align: center;
      }

      .error-content {
        max-width: 500px;
      }

      .error-code {
        font-size: 8rem;
        font-weight: 800;
        color: var(--primary-color);
        line-height: 1;
        margin-bottom: 1rem;
        opacity: 0.2;
      }

      .error-title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .error-message {
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .error-actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
