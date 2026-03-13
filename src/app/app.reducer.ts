import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { cartReducer } from './components/ngrx-cart/cart.reducer';
// import { authReducer } from './auth/auth.reducer';


// / We bind the keys from AppState to their Reducers
export const appReducers: ActionReducerMap<AppState> = {
    cart: cartReducer,
    // auth: authReducer,
};