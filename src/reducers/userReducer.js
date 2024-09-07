export const initialState = {
    user:null,
    userLoading:true
};
const userReducer=(state,action)=>{
    switch(action.type){
        case 'SET_USER':
            return {...state,user:action.payload}
        case 'ADD_ADDRESS':
            return {...state,address:action.payload}
        case 'START_USER_LOADING':
             return {...state,userLoading:true};    
        case 'STOP_USER_LOADING':
             return {...state,userLoading:false};    
        case 'ADD_TO_CART':
            return {...state,user:{...state.user,cart:[...state.user.cart,action.payload]}}
        case 'ADD_TO_WISHLIST':
            return {...state,user:{...state.user,wishlist:[...state.user.wishlist,action.payload]}}
        case 'DELETE_FROM_CART':
            return {...state,user:{...state.user,cart:state.user.cart.filter(prodId=>prodId.toString()!==action.payload.toString())}}    
        case 'DELETE_FROM_WISHLIST':
            return {...state,user:{...state.user,wishlist:state.user.wishlist.filter(prodId=>prodId!==action.payload)}}    
        default : 
            return {...state}

    }
}

export default userReducer;
