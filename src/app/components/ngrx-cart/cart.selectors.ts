import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

// 1. Select the main feature slice (Equivalent to this.cartItems())
export const selectCartState = createFeatureSelector<CartState>('cart');

// 2. Select the items array (Equivalent to public items = this.cartItems.asReadonly())
export const selectCartItems = createSelector(
    selectCartState,
    (state) => state.items
);

// 3. Computed: Total Price
export const selectTotalPrice = createSelector(
    selectCartItems, // It listens to the items array
    (items) => items.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

// 4. Computed: Total Items Count
export const selectTotalItemsCount = createSelector(
    selectCartItems,
    (items) => items.reduce((acc, item) => acc + item.quantity, 0)
);