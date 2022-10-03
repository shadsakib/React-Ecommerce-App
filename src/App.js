import './App.css';
import ProductList from './components/ProductList';
import ProductView from './components/ProductView';
import Checkout from './components/Checkout';

import Cart from './components/Cart';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      {/* <div className="App">
        {' '}
        <h1> Products</h1>{' '}
      </div> */}
      <div className="parent">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Cart />
      </div>
    </React.Fragment>
  );
}

export default App;
