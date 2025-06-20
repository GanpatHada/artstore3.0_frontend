export const setProductDetailsAction = (dispatch, productDetails) =>
  dispatch({ type: 'SET_PRODUCT_DETAILS', payload: productDetails });

export const startProductDetailsLoadingAction = (dispatch) =>
  dispatch({ type: 'START_LOADING' });

export const stopProductDetailsLoadingAction = (dispatch) =>
  dispatch({ type: 'STOP_LOADING' });

export const addReviewAction = (dispatch, review) =>
  dispatch({ type: 'ADD_REVIEW', payload: review });

export const updateReviewAction = (dispatch, review) =>
  dispatch({ type: 'UPDATE_REVIEW', payload: review });

export const deleteReviewAction = (dispatch, reviewId) =>
  dispatch({ type: 'DELETE_REVIEW', payload: reviewId });
