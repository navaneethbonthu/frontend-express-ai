import { Component, OnInit, signal } from '@angular/core';
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
export class ToastNotifications implements OnInit {

  ngOnInit(): void {
    const votes = ["apple", "banana", "apple", "orange", "banana", "apple"];

    const tally = votes.reduce((acc, fruit) => {
      acc[fruit] = (acc[fruit] || 0) + 1;
      return acc;
    }, {} as any);

    const students = [
      { name: "Alice", grade: "A" },
      { name: "Bob", grade: "B" },
      { name: "Charlie", grade: "A" },
      { name: "David", grade: "C" },
      { name: "Eve", grade: "B" },
    ];


    const groupedStudents = students.reduce((acc, student) => {
      if (!acc[student.grade]) {
        acc[student.grade] = [];
      }
      acc[student.grade].push(student.name)
    }, {} as any)


    const employees = [
      { id: "e1", name: "Alice", role: "Developer" },
      { id: "e2", name: "Bob", role: "Designer" },
      { id: "e3", name: "Charlie", role: "Manager" },
    ];

    const result = employees.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;

    }, {} as any)

    const products = [
      { name: "Product A", price: 30, rating: 4.5 },
      { name: "Product B", price: 20, rating: 4.8 },
      { name: "Product C", price: 40, rating: 4.5 },
      { name: "Product D", price: 15, rating: 4.8 },
    ];


    const sorting = [...products].sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return a.price - b.price
    })





  }

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
