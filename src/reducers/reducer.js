
const initialState = {
  bookList: {
    books: [],
    isLoading: true,
    error: null,
  },
  shoppingCartList: {
    cartItems: [],
    orderTotal: 0
  },
};

const updateItem = (book, item = {}, quantity) => {
  const { id = book.id, title = book.title,
    price = 0, total = 0 } = item;
  return {
    id,
    title,
    price: price + quantity * book.price,
    total: total + quantity
  }
};

const updateCartItems = (cartItems, newItem, cartIndex) => {
  if (cartIndex === -1) {
    return [...cartItems, newItem]
  }

  if (newItem.total === 0) {
    return [
      ...cartItems.slice(0, cartIndex),
      ...cartItems.slice(cartIndex + 1)
    ]
  }

  return [
    ...cartItems.slice(0, cartIndex),
    newItem,
    ...cartItems.slice(cartIndex + 1)
  ]
};

const updateOrder = (state, id, quantity) => {
  const { bookList: { books }, shoppingCartList: { cartItems } } = state;
  const book = books.find(book => book.id === id);
  const cartIndex = cartItems.findIndex(item => item.id === id);
  const item = cartItems[cartIndex];
  const newItem = updateItem(book, item, quantity);
  return {
    ...state.shoppingCartList,
    cartItems: updateCartItems(cartItems, newItem, cartIndex)
  }
};

const updateBooks = (state, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state.bookList,
        isLoading: true,
        error: null
      }
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state.bookList,
        books: action.payload,
        isLoading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state.bookList,
        books: [],
        isLoading: false,
        error: action.payload
      }

    default: return state.bookList
  }
};

const updateShoppingCartList = (state, action) => {
  switch (action.type) {

    case 'ON_ADDED_TO_CART':
      return updateOrder(state, action.payload, 1)

    case 'ON_DECREASED_CART':
      return updateOrder(state, action.payload, -1)

    case 'ON_DELETE_CART':
      const delIndex = state.shoppingCartList.cartItems.findIndex(cart => cart.id === action.payload)

      return {
        ...state.shoppingCartList,
        cartItems: [...state.shoppingCartList.cartItems.slice(0, delIndex), ...state.shoppingCartList.cartItems.slice(delIndex + 1)]
      }

    default: return state.shoppingCartList
  }
}

const reducer = (state = initialState, action) => {
  return {
    bookList: updateBooks(state, action),
    shoppingCartList: updateShoppingCartList(state, action)
  }
};

export default reducer;
