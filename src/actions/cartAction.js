export const setSelectedAllAction = (dispatch, cart) => {
  dispatch({ type: "SET_SELECTED_ALL", payload: cart });
};

export const toggleSelectAction = (dispatch, productId) => {
  dispatch({ type: "TOGGLE_SELECT", payload: productId });
};

export const removeSelectedAction = (dispatch, productId) => {
  dispatch({ type: "REMOVE_SELECTED", payload: productId });
};
