export const initialState={
    products:[],
    productsLoading:false,

   
};


const productReducer=(state,action)=>{
    switch(action.type){
        case "SET_PRODUCTS":
            return {...state,products:action.payload};
        case "START_PRODUCTS_LOADING":
            return {...state,productsLoading:true};
        case "STOP_PRODUCTS_LOADING" :
            return {...state,productsLoading:false}    
        default:return {...state}
    }
}
export default productReducer;