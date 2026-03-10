import { Component, input, output } from '@angular/core';
import { ApiStatus, Product } from '../../product-list/interfaces';

@Component({
  selector: 'app-product-table',
  imports: [],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable {
  // Inputs: Data coming DOWN from the Smart parent
  products = input<Product[]>([]);
  status = input<ApiStatus>('idle');

  // Outputs: Actions going UP to the Smart parent
  editRequest = output<Product>();
  deleteRequest = output<string>();
}
