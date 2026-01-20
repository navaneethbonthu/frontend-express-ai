import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [NgFor],
  template: `
    <header class="management-header">
      <h2>Product Management</h2>
      <button class="add-button">Add New Product</button>
    </header>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (product of products; track product.id) {
          <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>\${{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .management-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .add-button {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }
      .add-button:hover {
        background-color: #218838;
      }

      .table-container {
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #f4f7f9;
        font-weight: 600;
        color: #333;
        text-transform: uppercase;
        font-size: 0.9em;
      }
      tr:hover {
        background-color: #f9f9f9;
      }
      .edit-button,
      .delete-button {
        padding: 6px 10px;
        margin-right: 5px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
      }
      .edit-button {
        background-color: #007bff;
        color: white;
      }
      .edit-button:hover {
        background-color: #0056b3;
      }
      .delete-button {
        background-color: #dc3545;
        color: white;
      }
      .delete-button:hover {
        background-color: #c82333;
      }
    `,
  ],
})
export class ProductManagementComponent {
  products = [
    { id: 101, name: 'Laptop Pro X', category: 'Electronics', price: 1200.0, stock: 55 },
    { id: 102, name: 'Mechanical Keyboard', category: 'Accessories', price: 95.5, stock: 120 },
    { id: 103, name: '4K Monitor 32"', category: 'Electronics', price: 450.0, stock: 30 },
    { id: 104, name: 'Wireless Mouse', category: 'Accessories', price: 25.0, stock: 200 },
  ];
}
