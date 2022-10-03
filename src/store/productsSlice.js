import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProduct: (products, action) => {
      if (Array.isArray(action.payload) && products.length === 0) {
        products.push(...action.payload);
      } else if (!Array.isArray(action.payload)) {
        products.push(action.payload);
      }
    },
    updateProduct: (products, action) => {
      const index = products.findIndex((item) => item.id === action.payload.id);
      if (
        products[index].quantityInStock !== 0 ||
        action.payload.change !== -1
      ) {
        products[index] = {
          ...products[index],
          quantityInStock:
            products[index].quantityInStock + action.payload.change,
        };
      }
    },
    resetProduct: (products, action) => {
      products.splice(0, products.length);
    },
  },
});

export const { addProduct, updateProduct, resetProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
