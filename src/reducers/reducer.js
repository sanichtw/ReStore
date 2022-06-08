
const initialState = {
  books: [],
  isLoading: true,
  error: null,
  cartItems: [],
  orderTotal: 0
};

const updateItem = (book, item = {}) => {
  const { id = book.id, title = book.title,
    price = 0, total = 0 } = item;
  debugger
  return {
    id,
    title,
    price: price + book.price,
    total: total + 1
  }
};

const updateCartItems = (state, newItem, cartIndex) => {
  if (cartIndex === -1) {
    debugger
    return [...state.cartItems, newItem]
  }

  return [
    ...state.cartItems.splice(0, cartIndex),
    newItem,
    ...state.cartItems.splice(cartIndex + 1)
  ]
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
      const book = state.books.find(book => book.id === action.payload);
      const cartIndex = state.cartItems.findIndex(item => item.id === action.payload);
      const item = state.cartItems[cartIndex];
      debugger
      const newItem = updateItem(book, item);
      debugger
      return {
        ...state,
        cartItems: updateCartItems(state, newItem, cartIndex)
      }

    default:
      return state;
  }
};

export default reducer;
