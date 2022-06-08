import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

import './app.css';
import { connect } from 'react-redux';

const App = ({itemsLength}) => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={itemsLength} total={210} />
      <Routes>
        <Route
          path="/"
          element={<HomePage />} />

        <Route
          path="/cart"
          element={<CartPage />}
        />
      </Routes>

    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsLength: state.cartItems.length
  }
};

export default connect(mapStateToProps, {})(App);
