import { useContext } from "react";
import { CheckoutContext } from "../context/CheckoutContext";
import {
  setAddressAction,
  setProductsAction,
  resetCheckoutAction,
  setAmountAction,
} from "../actions/checkoutAction";

export const useCheckout = () => {
  const { state, dispatch } = useContext(CheckoutContext);
  const { address, products,amount} = state;

  const setAddress = (address) => setAddressAction(dispatch, address);
  const setProducts = (products) => setProductsAction(dispatch, products);
  const setAmount = (amount) => setAmountAction(dispatch, amount);
  const resetCheckout = () => resetCheckoutAction(dispatch);

  return {
    address,
    products,
    amount,
    setAddress,
    setProducts,
    setAmount,
    resetCheckout,
  };
};
