import { createContext, useReducer } from "react";
import productReducer, { initialState } from "../reducers/ProductReducer";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
