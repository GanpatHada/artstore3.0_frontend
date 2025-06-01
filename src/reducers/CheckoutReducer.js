
export const initialCheckoutState = {
  selectedAddress: null,
  amount: null,
  products:[]
};

const totalAmount=(amount)=>amount<500?amount+50:amount;

export const checkoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, selectedAddress: action.payload };
    case "REMOVE_ADDRESS":
        return { ...state, selectedAddress: null };  
    case "SET_PRODUCTS":
        return {...state,products:action.payload}    
    case "SET_AMOUNT":
      return { ...state, amount: totalAmount(action.payload) };
    default : return {...state}  
  }
};
