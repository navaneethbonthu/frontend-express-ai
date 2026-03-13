import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { selectTotalItemsCount, selectTotalPrice } from "./cart.selectors";
import { Store } from "@ngrx/store";
import { AsyncPipe } from "@angular/common";
import * as CartActions from './cart.actions';



@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div>Total Items: {{ totalItems$ | async }}</div>
    
    <!-- NOTICE THE BACKSLASH BEFORE THE DOLLAR SIGN HERE -->
    <div>Total Price: \${{ totalPrice$ | async }}</div>
    
    <button (click)="onAddToCart()">Add</button>
  `
})
export class CartComponent {
    // Read Data (using Selectors)
    private store = inject(Store);
    totalItems$ = this.store.select(selectTotalItemsCount);
    totalPrice$ = this.store.select(selectTotalPrice);


    // Write Data (using Actions)
    onAddToCart() {

        const product = {
            id: 'prod-987234',
            name: 'Sony Wireless Noise-Cancelling Headphones',
            category: {
                id: 'cat-audio-01',
                name: 'Electronics & Audio'
            },
            price: 299.99,
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
        };;
        // We don't call a method, we dispatch an Action
        this.store.dispatch(CartActions.addToCart({ product }));
    }
}