
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
  return {
    id,
    title,
    price: price + book.price,
    total: total + 1
  }
};

const updateCartItems = (cartItems, newItem, cartIndex) => {
  if (cartIndex === -1) {
    return [...cartItems, newItem]
  }

  return [
    ...cartItems.slice(0, cartIndex),
    newItem,
    ...cartItems.slice(cartIndex + 1)
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
      const newItem = updateItem(book, item);
      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, cartIndex)
      }

    case 'ON_DELETE_CART':
      const idx = action.payload;
      const delIndex = state.cartItems.findIndex(cart => cart.id === idx)

      return {
        ...state,
        cartItems: [...state.cartItems.slice(0, delIndex), ...state.cartItems.slice(delIndex + 1)]
      }

    default:
      return state;
  }
};

export default reducer;
