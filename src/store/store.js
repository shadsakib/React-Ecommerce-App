import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

const enhancers =
  window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore(
  {
    reducer: { cart: cartReducer, products: productsReducer },
  },
  enhancers
);

export default store;
