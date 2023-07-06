/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICart } from './cartSlice.interface';
import { IProduct } from '@/types/globalTypes';

const initialState: ICart = {
  products: [],
  total: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.total + action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct && existingProduct.quantity! > 1) {
        existingProduct.quantity = existingProduct.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
      state.total = state.total - action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.total =
        state.total - action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
