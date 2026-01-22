import { Component, signal, inject, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductListService } from '../../product-list/product-list.service';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.scss',
})
export class AddProductFormComponent implements OnInit {
  fb = inject(FormBuilder);

  productAdded = output<any>();

  private productListService = inject(ProductListService); // Assume a service that provides categories
  categories = this.productListService._Categories;
  addProductForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: [''],
    category: ['', Validators.required],
  });

  constructor() {
    this.productListService.getAllCategories();
  }
  ngOnInit() {
    console.log(this.categories());
  }
  onAddProduct() {
    if (this.addProductForm.valid) {
      const userId = 'cmk26t4j60000u7rba7owud9h';
      const formValue = { ...this.addProductForm.value, userId: userId };
      this.productListService.addProduct(formValue);
      // console.log('Product Added:', formValue);

      this.productAdded.emit(formValue);
      this.addProductForm.reset();
    } else {
      this.addProductForm.markAllAsTouched();
    }
  }

  cancel() {
    this.productAdded.emit(null);
    this.addProductForm.reset();
  }
}
