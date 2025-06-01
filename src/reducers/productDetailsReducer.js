export const initialProductDetailsState={
    productDetails:null,
    loading:true
}

const productDetailsReducer=(state,action)=>{
    switch(action.type)
    {
        case "SET_PRODUCT_DETAILS":
            return {...state,productDetails:action.payload}
        case "START_LOADING":
            return {...state,loading:true}
        case "STOP_LOADING":
            return {...state,loading:false}        
        
    }
}

export default productDetailsReducer