const booksLoaded = (newBooks) => ({ type: 'FETCH_BOOKS_SUCCESS', payload: newBooks });
const booksLoading = () => ({ type: 'FETCH_BOOKS_REQUEST' });
const booksError = (err) => ({ type: 'FETCH_BOOKS_FAILURE', payload: err });
export const onAddedToCart = (bookId) => ({ type: 'ON_ADDED_TO_CART', payload: bookId });
export const fetchBooks = (dispatch, bookstoreService) => () => {
    dispatch(booksLoading());
    bookstoreService.getBooks()
        .then(data => dispatch(booksLoaded(data)))
        .catch(err => dispatch(booksError(err)))
};
export const onDeleteCart = (idx) => ({ type: 'ON_DELETE_CART', payload: idx });
export const onIncreaseCart = (idx) => ({ type: 'ON_INCREASE_CART', payload: idx });