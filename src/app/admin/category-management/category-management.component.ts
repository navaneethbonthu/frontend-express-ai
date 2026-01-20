import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [NgFor],
  template: `
    <header class="management-header">
      <h2>Category Management</h2>
      <button class="add-button">Add New Category</button>
    </header>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Product Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (category of categories; track category.id) {
          <tr>
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>{{ category.productCount }}</td>
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
export class CategoryManagementComponent {
  categories = [
    { id: 1, name: 'Electronics', productCount: 350 },
    { id: 2, name: 'Accessories', productCount: 500 },
    { id: 3, name: 'Books', productCount: 150 },
    { id: 4, name: 'Home Goods', productCount: 200 },
  ];
}
