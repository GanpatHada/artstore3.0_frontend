export const setProductsAction=(dispatch,productList)=>dispatch({type:'SET_PRODUCTS',payload:productList});
export const startProductsLoadingAction=(dispatch)=>dispatch({type:'START_PRODUCTS_LOADING'});
export const stopProductsLoadingAction=(dispatch)=>dispatch({type:'STOP_PRODUCTS_LOADING'})
export const toggleViewAction=(dispatch)=>dispatch({type:'TOGGLE_VIEW'})