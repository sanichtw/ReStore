import React, { Component } from 'react';
import BooksList from '../../books-list/books-list';

export default class HomePage extends Component {

    render() {
        const { books } = this.props;
        return <ul>
            {books.map(book => {
                return <li key={book.id}>
                    <BooksList book={book} />
                </li>
            })}
        </ul>
    }
};
