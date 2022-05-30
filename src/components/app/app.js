import React from 'react';
import { Route, Routes } from 'react-router-dom';
import withBookStoreService from '../hoc/with-bookstore-service';
import CardPage from '../pages/card-page/card-page';
import HomePage from '../pages/homepage/homepage';
import './app.css';

const App = ({ bookstoreService }) => {
  console.log(bookstoreService.getBooks())
  const books = [
    { id: 1, title: "React-Redux", author: "Author" },
    { id: 2, title: "You don't know JS", author: "Author" },
  ];
  return <>
    <Routes>
      <Route path="/"
        element={<HomePage books={books} />}
      />
      <Route path="cardpage"
        element={<CardPage />} />
    </Routes>
  </>;
};

export default withBookStoreService()(App);
