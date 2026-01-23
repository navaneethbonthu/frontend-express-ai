import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>{{ isLogin() ? 'Welcome Back' : 'Create Account' }}</h1>
          <p>
            {{
              isLogin()
                ? 'Enter your details to access your account'
                : 'Join our community and start shopping'
            }}
          </p>
        </div>

        <form [formGroup]="authForm" (ngSubmit)="onSubmit()">
          @if (!isLogin()) {
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" formControlName="name" class="form-input" placeholder="John Doe" />
            </div>
          }

          <div class="form-group">
            <label>Email Address</label>
            <input
              type="email"
              formControlName="email"
              class="form-input"
              placeholder="name@example.com"
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              formControlName="password"
              class="form-input"
              placeholder="••••••••"
            />
          </div>

          @if (isLogin()) {
            <div class="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          }

          <button type="submit" class="btn btn-primary btn-block auth-btn">
            {{ isLogin() ? 'Sign In' : 'Sign Up' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>
            {{ isLogin() ? "Don't have an account?" : 'Already have an account?' }}
            <button (click)="toggleMode()" class="toggle-btn">
              {{ isLogin() ? 'Create one now' : 'Sign in instead' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
        padding: 2rem;
      }

      .auth-card {
        background-color: var(--surface-color);
        border-radius: var(--border-radius-lg);
        border: 1px solid var(--border-color);
        padding: 3rem;
        width: 100%;
        max-width: 450px;
        box-shadow: var(--shadow-lg);
      }

      .auth-header {
        text-align: center;
        margin-bottom: 2.5rem;

        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        p {
          color: var(--text-secondary);
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

      .forgot-password {
        text-align: right;
        margin-bottom: 1.5rem;
        a {
          font-size: 0.875rem;
          color: var(--primary-color);
          font-weight: 500;
        }
      }

      .auth-btn {
        padding: 0.875rem;
        font-size: 1rem;
      }

      .auth-footer {
        margin-top: 2rem;
        text-align: center;
        color: var(--text-secondary);
        font-size: 0.875rem;

        .toggle-btn {
          color: var(--primary-color);
          font-weight: 600;
          margin-left: 0.25rem;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      .btn-block {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  isLogin = signal(true);
  authService = inject(AuthService);
  private router = inject(Router);
  authForm = this.fb.group({
    email: ['test@example.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(6)]],
  });

  toggleMode() {
    this.isLogin.update((v) => !v);
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value).subscribe({
        next: (response) => {
          if (response.token) {
            this.authForm.reset();
            this.router.navigate(['/products']);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
        },
      });
    }
  }
}
