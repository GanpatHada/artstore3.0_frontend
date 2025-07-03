import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  setSelectedAllAction,
  toggleSelectAction,
  removeSelectedAction,
  setCartItemsAction,
  startCartLoadingAction,
  stopCartLoadingAction,
} from "../actions/cartAction";

export const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  const setSelectedAll = (cart) => setSelectedAllAction(dispatch, cart);
  const toggleSelect = (productId) => toggleSelectAction(dispatch, productId);
  const removeSelected = (productId) => removeSelectedAction(dispatch, productId);
  const setCartItems = (cartItems) => setCartItemsAction(dispatch, cartItems);
  const startLoading = () => startCartLoadingAction(dispatch);
  const stopLoading = () => stopCartLoadingAction(dispatch);

  return {
    selectedProductIds: state.selectedItems,
    cartItems: state.cartItems,
    cartItemsLoading: state.cartItemsLoading,
    setSelectedAll,
    toggleSelect,
    removeSelected,
    setCartItems,
    startLoading,
    stopLoading,
  };
};
