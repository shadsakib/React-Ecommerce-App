import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (cart, action) => {
      if (!cart.some((item) => item.id === action.payload.id)) {
        cart.push(action.payload);
      }
    },
    changeQuantity: (cart, action) => {
      const index = cart.findIndex((item) => item.id === action.payload.id);

      if (
        cart[index].quantity !== cart[index].quantityInStock ||
        action.payload.change === -1
      ) {
        cart[index] = {
          ...cart[index],
          quantity: cart[index].quantity + action.payload.change,
        };
      }
      if (cart[index].quantity === 0) cart.splice(index, 1);
    },
    removeItem: (cart, action) => {
      const index = cart.findIndex((item) => item.id === action.payload.id);
      cart.splice(index, 1);
    },
    clear: (cart, action) => {
      cart.splice(0, cart.length);
    },
  },
});

export const { addItem, changeQuantity, removeItem, clear } = cartSlice.actions;

export default cartSlice.reducer;
