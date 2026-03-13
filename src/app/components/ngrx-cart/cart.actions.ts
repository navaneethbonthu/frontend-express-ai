import { createAction, props } from "@ngrx/store";
import { Product } from "../product-list/interfaces";

export const addToCart = createAction('[Cart Page] Add to Cart', props<{ product: Product }>());
export const removeCartItem = createAction('[Cart Page] Remove Cart Item ', props<{ productId: string }>())
export const updateQuantity = createAction(
    '[Cart Page] Update Quantity',
    props<{ productId: string; quantity: number }>()
);