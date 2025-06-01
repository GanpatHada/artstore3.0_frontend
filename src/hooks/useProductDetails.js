import { useContext } from "react";
import { ProductDetailsContext } from "../context/ProductDetailsContext";
import {
  setProductDetailsAction,
  startProductDetailsLoadingAction,
  stopProductDetailsLoadingAction,
} from "../actions/productDetailsAction";

export const useProductDetails = () => {
  const {
    state: { productDetails, loading },
    dispatch,
  } = useContext(ProductDetailsContext);


  const setProductDetails = (productInfo) =>
    setProductDetailsAction(dispatch, productInfo);
  const startProductDetailsLoading = () =>
    startProductDetailsLoadingAction(dispatch);
  const stopProductDetailsLoading = () =>
    stopProductDetailsLoadingAction(dispatch);

  return {
    setProductDetails,
    startProductDetailsLoading,
    stopProductDetailsLoading,
    productDetails,
    loading,
  };
};
