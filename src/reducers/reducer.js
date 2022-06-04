
const initialState = {
  books: [],
  isLoading: true,
  error: null,
  cartItems: [],
  orderTotal: 0
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        isLoading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        isLoading: false,
        error: action.payload
      }

    case 'ON_ADDED_TO_CART':
      const newItem = state.books.find(book => book.id === action.payload);
      const checkedItem = state.cartItems.find(book => book.name === newItem.title);
      let total = 0;
      for (let i = 0; i < state.cartItems.length; i++) {
        total += state.cartItems[i].count * state.cartItems[i].total
        debugger
      }
      if (checkedItem) {
        checkedItem.total += 1
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
          ],
          orderTotal: total
        }
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            id: newItem.id,
            name: newItem.title,
            count: newItem.price,
            total: 1
          },
        ]
      }

    default:
      return state;
  }
};

export default reducer;
