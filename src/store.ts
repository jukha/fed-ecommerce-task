import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer, { selectCart } from "../src/components/shop/cart/cartSlice";
import { Product } from "./types/Product";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const preloadedState = {
  cart: { cart: JSON.parse(localStorage.getItem("cart") || "[]") as Product[] },
};

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  const cart = selectCart(store.getState());
  localStorage.setItem("cart", JSON.stringify(cart));
});

export default store;
