import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-layout">
      <nav class="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <a routerLink="dashboard" routerLinkActive="active" ariaCurrentWhenActive="page"
              >Dashboard</a
            >
          </li>
          <li>
            <a routerLink="products" routerLinkActive="active" ariaCurrentWhenActive="page"
              >Product Management</a
            >
          </li>
          <li>
            <a routerLink="categories" routerLinkActive="active" ariaCurrentWhenActive="page"
              >Category Management</a
            >
          </li>
        </ul>
      </nav>
      <main class="admin-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: calc(100vh - 100px); /* Adjust based on header/footer height */
        background-color: #f4f7f9;
      }

      .admin-layout {
        display: flex;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 0;
      }

      .admin-sidebar {
        width: 250px;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-right: 20px;
      }

      .admin-sidebar h2 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        color: #333;
      }

      .admin-sidebar ul {
        list-style: none;
        padding: 0;
        margin-top: 20px;
      }

      .admin-sidebar li {
        margin-bottom: 10px;
      }

      .admin-sidebar a {
        display: block;
        padding: 10px 15px;
        text-decoration: none;
        color: #555;
        border-radius: 4px;
        transition: background-color 0.2s, color 0.2s;
      }

      .admin-sidebar a:hover {
        background-color: #eef1f4;
        color: #007bff;
      }

      .admin-sidebar a.active {
        background-color: #007bff;
        color: #ffffff;
        font-weight: bold;
      }

      .admin-content {
        flex-grow: 1;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class AdminComponent {}
