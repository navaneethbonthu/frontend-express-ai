import { Component, signal } from '@angular/core';
import { CartComponent } from "../cart/cart.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
}

@Component({
  selector: 'app-toast-notifications',
  imports: [CartComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './toast-notifications.html',
  styleUrl: './toast-notifications.scss',
})
export class ToastNotifications {
  show: boolean = false;

  notifications = signal<Toast[]>([]);

  showToast(message: string, type: 'success' | 'error' | 'warning') {
    const id = Date.now();

    this.notifications.update(all => [...all, { id, type, message }])

    setTimeout(() => {
      this.dismiss(id);
    }, 3000);

  }

  dismiss(id: any) {
    this.notifications.update(all => all.filter((item) => item.id !== id))
  }

}
