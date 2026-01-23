import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../components/cart/cart.service';
import { AuthService } from '../components/auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);

  currentUser$ = this.authService.currentUser$;
  isAdmin$ = this.authService.isAdmin$;
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor() { }
  logout(): void {
    this.authService.logout();
  }
}
