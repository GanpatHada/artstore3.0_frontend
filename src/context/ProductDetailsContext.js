import { createContext, useReducer } from "react";
import productDetailsReducer, {
  initialProductDetailsState,
} from "../reducers/productDetailsReducer";

export const ProductDetailsContext = createContext();

const ProductDetailsProvider = ({ children }) => {
  const [state,dispatch] = useReducer(
    productDetailsReducer,
    initialProductDetailsState
  );
  return (
    <ProductDetailsContext.Provider value={{state,dispatch}}>
        {children}
    </ProductDetailsContext.Provider>
  );
};

export default ProductDetailsProvider
