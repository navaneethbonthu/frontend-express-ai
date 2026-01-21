import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><a routerLink="products">Manage Products</a></li>
          <li><a routerLink="categories">Manage Categories</a></li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .admin-dashboard {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
        font-family: 'Arial', sans-serif;
      }

      h1 {
        color: #333;
        margin-bottom: 20px;
        text-align: center;
      }

      nav ul {
        list-style: none;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 30px;
      }

      nav li a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
        padding: 10px 15px;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }

      nav li a:hover,
      nav li a.active {
        background-color: #007bff;
        color: #fff;
      }
    `,
  ],
  standalone: true,
  imports: [RouterOutlet],
})
export default class AdminDashboardComponent {}
