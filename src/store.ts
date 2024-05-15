// store.ts
import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../src/components/shop/cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
