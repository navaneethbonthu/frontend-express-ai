import { createReducer, on } from '@ngrx/store';
// import { CartItem } from './cart.model'; // Assuming CartItem is exported here
import { Product } from '../product-list/interfaces';
import * as CartActions from './cart.actions';

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

// 2. Define Initial State (Equivalent to your signal<CartItem[]>([]))
export const initialState: CartState = {
    items: [],
};

// 3. The Reducer (Equivalent to your .update() blocks)
export const cartReducer = createReducer(
    initialState,

    // Equivalent to: addToCart(product: Product)
    on(CartActions.addToCart, (state, { product }) => {
        const existingItem = state.items.find((item) => item.id === product.id);

        if (existingItem) {
            // Return new state immutably
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        }

        // Add new item immutably
        return {
            ...state,
            items: [...state.items, { ...product, quantity: 1 }],
        };
    }),

    // Equivalent to: remoCartItem(productId: string)
    on(CartActions.removeCartItem, (state, { productId }) => ({
        ...state,
        items: state.items.filter((item) => item.id !== productId),
    })),

    // Equivalent to: updateQuantity(productId: string, quantity: number)
    on(CartActions.updateQuantity, (state, { productId, quantity }) => ({
        ...state,
        items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        ),
    }))
);