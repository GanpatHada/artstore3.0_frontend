import { useContext } from "react";
import { ProductDetailsContext } from "../context/ProductDetailsContext";
import {
  deleteReviewAction,
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

  const deleteReview = (reviewId) =>
    deleteReviewAction(dispatch, reviewId);

  return {
    setProductDetails,
    startProductDetailsLoading,
    stopProductDetailsLoading,
    productDetails,
    loading,
    deleteReview
    
  };
};
