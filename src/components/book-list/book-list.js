import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, onAddedToCart } from '../../actions/actions';
import { compose } from '../../utils';

import './book-list.css';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, isLoading, error, onAddedToCart } = this.props;
    if (isLoading) return <Spinner />
    if (error) return <ErrorIndicator />
    return <BookList books={books} onAddedToCart={onAddedToCart} />
  }
}

const mapStateToProps = ({ bookList: { books, isLoading, error } }) => {
  return { books, isLoading, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // or destructure bookstoreService from the ownProps
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(dispatch, bookstoreService),
    onAddedToCart: (id) => dispatch(onAddedToCart(id))
  }
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);


const BookList = ({ books, onAddedToCart }) => {
  return (
    < ul className="book-list" >
      {
        books.map((book) => {
          return (
            <li key={book.id}><BookListItem book={book} onAddedToCart={onAddedToCart} /></li>
          )
        })
      }
    </ul >
  )
}