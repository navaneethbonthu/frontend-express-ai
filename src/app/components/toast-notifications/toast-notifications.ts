import { Component, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
}

@Component({
  selector: 'app-toast-notifications',
  imports: [],
  templateUrl: './toast-notifications.html',
  styleUrl: './toast-notifications.scss',
})
export class ToastNotifications {

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
