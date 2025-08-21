export const setActiveListAction = (dispatch, listId) => {
  dispatch({ type: "SET_ACTIVE_LIST", payload: listId });
};

export const toggleViewAction = (dispatch) => {
  dispatch({ type: "TOGGLE_VIEW" });
};

export const openModalAction = (dispatch, modalName) => {
  dispatch({ type: "OPEN_MODAL", payload: modalName });
};

export const closeModalAction = (dispatch) => {
  dispatch({ type: "CLOSE_MODAL" });
};


