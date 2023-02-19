import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@interfaces/IProduct';
import { IState } from '@interfaces/IState';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [] as IProduct[],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state: IState, action) => {
      console.log(action.payload);
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state: IState) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
