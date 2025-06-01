export const setProductDetailsAction=(dispatch,productDetails)=>dispatch({type:'SET_PRODUCT_DETAILS',payload:productDetails});
export const startProductDetailsLoadingAction=(dispatch)=>dispatch({type:'START_LOADING'});
export const stopProductDetailsLoadingAction=(dispatch)=>dispatch({type:'STOP_LOADING'})