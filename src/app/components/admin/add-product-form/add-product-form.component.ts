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
  isEdit  = signal(false);

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

    if (this.isEdit()) {
      
      // this.productListService.updateProduct(productId, this.addProductForm.value);
      // console.log('Product Updated:', this.addProductForm.value);

      this.productAdded.emit(this.addProductForm.value);
      this.addProductForm.reset();
    }

    if (this.addProductForm.valid) {
      // const userId = 'cmk26t4j60000u7rba7owud9h';
      const formValue = {
        name: this.addProductForm.value.name,
        price: this.addProductForm.value.price,
        description: this.addProductForm.value.description,
        categoryId: this.addProductForm.value.category // Map 'category' value to 'categoryId' key
      };
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
