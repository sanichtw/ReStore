import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { BookstoreServiceProvider } from './components/bookstore-service-context';
import BookstoreService from './services/bookstore-service';
import ErrorBoundry from './components/error-boundry'
import store from './store';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/homepage/homepage';

const bookstoreService = new BookstoreService();
const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store}>
        <ErrorBoundry>
            <BookstoreServiceProvider value={bookstoreService}>
                <Router>
                    <App />
                </Router>
            </BookstoreServiceProvider>
        </ErrorBoundry>
    </Provider>,
);