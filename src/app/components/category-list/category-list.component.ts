import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

interface Category {
  id: number;
  name: string;
  image: string;
  itemCount: number;
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <div class="container">
      <h1 class="section-title">Shop by Category</h1>

      <div class="category-grid">
        @for (category of categories(); track category.id) {
        <div
          class="category-card"
          [routerLink]="['/products']"
          [queryParams]="{ category: category.name }"
        >
          <div class="category-image">
            <img [ngSrc]="category.image" [alt]="category.name" width="400" height="500" />
          </div>
          <div class="category-overlay">
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <span class="item-count">{{ category.itemCount }} Items</span>
              <span class="view-all">View All Products →</span>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
      }

      .category-card {
        position: relative;
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        aspect-ratio: 4/5;
        cursor: pointer;

        .category-image {
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
        }

        .category-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            transparent 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 2rem;
          transition: background 0.3s ease;
        }

        &:hover {
          .category-image img {
            transform: scale(1.1);
          }
          .category-overlay {
            background: linear-gradient(
              to top,
              rgba(37, 99, 235, 0.8) 0%,
              rgba(0, 0, 0, 0.2) 50%,
              transparent 100%
            );
          }
        }

        .category-info {
          color: white;

          h3 {
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
          }

          .item-count {
            display: block;
            font-size: 0.875rem;
            opacity: 0.9;
            margin-bottom: 1rem;
          }

          .view-all {
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  categories = signal<Category[]>([
    {
      id: 1,
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
      itemCount: 156,
    },
    {
      id: 2,
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
      itemCount: 243,
    },
    {
      id: 3,
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1484101403033-571067250931?w=800&q=80',
      itemCount: 89,
    },
    {
      id: 4,
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
      itemCount: 112,
    },
    {
      id: 5,
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1461896704190-3213c9ad99db?w=800&q=80',
      itemCount: 67,
    },
    {
      id: 6,
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
      itemCount: 432,
    },
  ]);
}
