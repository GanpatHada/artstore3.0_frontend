export const initialState={
    products:[],
    filters:{
        categories:[],
        priceRange:[0,10000],
        ratings:null,
        sortBy:null
    }
};


const productReducer=(state,action)=>{
    switch(action.type){
        case "SET_PRODUCTS":
            return {...state,products:action.payload};
        case "SET_CATEGORY_FILTER":
            return {...state,filters:{...state.filters,categories:[...state.filters.categories,action.payload]}}
        case "REMOVE_CATEGORY_FILTER":
            return {...state,filters:{...state.filters,categories:state.filters.categories.filter(value=>value!==action.payload)}}    
        case "SET_MINIMUM_RATING_FILTER":
            return {...state,filters:{...state.filters,ratings:action.payload}}
        case "SET_PRICE_RANGE":
            return {...state,filters:{...state.filters,priceRange:action.payload}}  
        case "SET_SORT_BY":
            return {...state,filters:{...state.filters,sortBy:action.payload}}  
        case "CLEAR_FILTERS":
            return {...state,filters:{...state.filters,categories:[],priceRange:[0,10000],ratings:null,sortBy:null}}              
        default : return {...state}
    }
}
export default productReducer;