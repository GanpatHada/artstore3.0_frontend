export const setCartItemsAction = (dispatch, cartItems) => {
  dispatch({ type: "SET_CART_ITEMS", payload: cartItems });
};

export const setSelectedAllAction = (dispatch, cartItems) => {
  dispatch({ type: "SET_SELECTED_ALL", payload: cartItems });
};

export const toggleSelectAction = (dispatch, productId) => {
  dispatch({ type: "TOGGLE_SELECT", payload: productId });
};

export const removeSelectedAction = (dispatch, productId) => {
  dispatch({ type: "REMOVE_SELECTED", payload: productId });
};

export const startCartLoadingAction = (dispatch) => {
  dispatch({ type: "SET_CART_LOADING", payload: true });
};

export const stopCartLoadingAction = (dispatch) => {
  dispatch({ type: "SET_CART_LOADING", payload: false });
};

