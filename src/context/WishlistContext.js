import { createContext, useReducer } from "react";
import wishlistReducer, { initialWishlistState } from "../reducers/wishlistReducer";


export const WishlistContext = createContext(null);


export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialWishlistState);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}
