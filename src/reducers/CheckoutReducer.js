export const initialCheckoutState = {
  address: null,
  products: [],
  amount:0
};

export const checkoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, address: action.payload };

    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "SET_AMOUNT":
      return { ...state, amount: action.payload };

    case "RESET_CHECKOUT":
      return { ...initialCheckoutState };

    default:
      return state;
  }
};

