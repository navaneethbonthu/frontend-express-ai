import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OverlayPanelComponent } from '../overlay-panel.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductListService } from '../../product-list/product-list.service';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OverlayPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: 'category-management.html',
  styleUrl: 'category-management.scss'
})
export class CategoryManagementComponent implements OnInit {
  fb = inject(FormBuilder);
  productListService = inject(ProductListService);

  showAddCategoryPanel = signal(false);

  addCategoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  ngOnInit() {
    this.productListService.getAllCategories();
  }

  toggleAddCategoryPanel() {
    this.showAddCategoryPanel.update((value) => !value);
    if (!this.showAddCategoryPanel()) {
      this.addCategoryForm.reset();
    }
  }

  onAddCategory() {
    if (this.addCategoryForm.valid) {
      // In a real app, you'd call a service to add category
      // this.productListService.addCategory(this.addCategoryForm.value).subscribe(...)
      this.toggleAddCategoryPanel();
      this.productListService.getAllCategories();
    } else {
      this.addCategoryForm.markAllAsTouched();
    }
  }
}
