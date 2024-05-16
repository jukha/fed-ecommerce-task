import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../../store";
import { Product } from "./../../../types/Product";

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = newItem.quantity;
        existingItem.totalPrice = newItem.totalPrice;
      } else {
        state.cart.push(action.payload);
      }
    },

    deleteItem(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseItemQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
      }
    },

    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.quantity--;
        item.totalPrice = item.price * item.quantity;
        if (item.quantity === 0) {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export const selectTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const selectCurrentQuantityById = (id: string) => (state: RootState) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;

export const selectItemById = (id: string) => (state: RootState) =>
  state.cart.cart.find((item) => item.id === id);
