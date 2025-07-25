export const initialState={
    products:[],
    view:'ROW',
    productsLoading:true,

   
};


const productReducer=(state,action)=>{
    switch(action.type){
        case "SET_PRODUCTS":
            return {...state,products:action.payload};
        case "TOGGLE_VIEW":
            return {...state,view:state.view==='ROW'?'GRID':'ROW'}    
        case "START_PRODUCTS_LOADING":
            return {...state,productsLoading:true};
        case "STOP_PRODUCTS_LOADING" :
            return {...state,productsLoading:false}    
        default:
            return state
    }
}
export default productReducer;