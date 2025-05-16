import { createContext, useReducer } from "react";
import { checkoutReducer, initialCheckoutState } from "../reducers/CheckoutReducer";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer,initialCheckoutState);
  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;