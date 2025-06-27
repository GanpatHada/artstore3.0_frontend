import { createContext, useReducer } from "react";
import {initialSelectedCart, selectedCartReducer } from "../reducers/cartReducer";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedProductIds, dispatch] = useReducer(selectedCartReducer,initialSelectedCart);

  return (
    <CartContext.Provider value={{ selectedProductIds, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};