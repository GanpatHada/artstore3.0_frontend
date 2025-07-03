export const setAddressAction = (dispatch, address) => {
  dispatch({ type: "SET_ADDRESS", payload: address });
};

export const setProductsAction = (dispatch, products) => {
  dispatch({ type: "SET_PRODUCTS", payload: products });
};

export const setAmountAction = (dispatch, amount) => {
  dispatch({ type: "SET_AMOUNT", payload: amount });
};

export const resetCheckoutAction = (dispatch) => {
  dispatch({ type: "RESET_CHECKOUT" });
};
