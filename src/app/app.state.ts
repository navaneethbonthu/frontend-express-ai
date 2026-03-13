import { CartState } from "./components/ngrx-cart/cart.reducer";

export interface AppState {
    cart: CartState; // The slice we built earlier
    // auth: AuthState; // Example: is the user logged in?
    // products: ProductState; 
    // theme: ThemeState;
}