export const initialCartState = {
  cartItems: [],
  selectedItems: [],
  cartItemsLoading: false,
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };

    case "SET_SELECTED_ALL":
      return {
        ...state,
        selectedItems: action.payload.map((item) => item._id),
      };

    case "TOGGLE_SELECT":
      return {
        ...state,
        selectedItems: state.selectedItems.includes(action.payload)
          ? state.selectedItems.filter((id) => id !== action.payload)
          : [...state.selectedItems, action.payload],
      };

    case "REMOVE_SELECTED":
      return {
        ...state,
        selectedItems: state.selectedItems.filter((id) => id !== action.payload),
      };

    case "SET_CART_LOADING":
      return { ...state, cartItemsLoading: action.payload };

    default:
      return state;
  }
};

