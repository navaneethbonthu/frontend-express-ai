import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <h2>Dashboard Overview</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Products</h3>
        <p>1,245</p>
      </div>
      <div class="stat-card">
        <h3>Total Categories</h3>
        <p>42</p>
      </div>
      <div class="stat-card">
        <h3>Pending Orders</h3>
        <p>15</p>
      </div>
      <div class="stat-card">
        <h3>Revenue (Last 30 Days)</h3>
        <p>$150,230</p>
      </div>
    </div>
    <div class="dashboard-links">
      <p>Quick Actions:</p>
      <ul>
        <li><a [routerLink]="['/admin/products']">Manage Products</a></li>
        <li><a [routerLink]="['/admin/categories']">Manage Categories</a></li>
      </ul>
    </div>
  `,
  styles: [
    `
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }
      .stat-card {
        padding: 20px;
        background-color: #f7f7f7;
        border-radius: 8px;
        border-left: 5px solid #007bff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
      .stat-card h3 {
        margin-top: 0;
        font-size: 1.1em;
        color: #555;
      }
      .stat-card p {
        font-size: 2em;
        font-weight: bold;
        color: #333;
        margin: 5px 0 0;
      }
      .dashboard-links ul {
        list-style: none;
        padding: 0;
      }
      .dashboard-links li {
        margin-bottom: 10px;
      }
      .dashboard-links a {
        color: #007bff;
        text-decoration: none;
        font-weight: 500;
      }
      .dashboard-links a:hover {
        text-decoration: underline;
      }
    `,
  ],
  standalone: true,
  imports: [RouterLink],
})
export class AdminDashboardComponent {}
