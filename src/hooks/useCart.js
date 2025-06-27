import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  setSelectedAllAction,
  toggleSelectAction,
  removeSelectedAction,
} from "../actions/cartAction";

export const useCart = () => {
  const { selectedProductIds, dispatch } = useContext(CartContext);

  const setSelectedAll = (cart) => setSelectedAllAction(dispatch, cart);
  const toggleSelect = (productId) => toggleSelectAction(dispatch, productId);
  const removeSelected = (productId) => removeSelectedAction(dispatch, productId);

  return {
    selectedProductIds,
    setSelectedAll,
    toggleSelect,
    removeSelected,
  };
};
