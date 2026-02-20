import { Component, signal, inject, output, OnInit, input, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductListService } from '../../product-list/product-list.service';
import { Product } from '../../product-list/interfaces';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productListService = inject(ProductListService);

  editingProduct = input<Product | null>(null);
  productAdded = output<any>();

  categories = this.productListService._Categories;

  addProductForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: [''],
    category: ['', Validators.required],
  });

  constructor() {
    this.productListService.getAllCategories();
    console.log('all categoryes', this.categories());


    effect(() => {
      const product = this.editingProduct();
      if (product) {
        this.addProductForm.patchValue({
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category.id,
        });
      } else {
        this.addProductForm.reset({
          name: '',
          price: 0,
          description: '',
          category: '',
        });
      }
    });
  }

  ngOnInit() {
    // Categories are loaded in constructor via service
  }

  onAddProduct() {
    if (this.addProductForm.valid) {
      const formValue = this.addProductForm.value;
      const payload = {
        id: this.editingProduct()?.id,
        name: formValue.name,
        price: formValue.price,
        description: formValue.description,
        categoryId: formValue.category
      };

      this.productAdded.emit(payload);
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
