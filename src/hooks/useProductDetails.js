import { useContext } from "react";
import { ProductDetailsContext } from "../context/ProductDetailsContext";
import {
  addReviewAction,
  deleteReviewAction,
  setProductDetailsAction,
  startProductDetailsLoadingAction,
  stopProductDetailsLoadingAction,
  updateReviewAction,
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

  const addReview = (review) =>
    addReviewAction(dispatch, review);

  const updateReview = (review) =>
    updateReviewAction(dispatch, review);

  const deleteReview = (reviewId) =>
    deleteReviewAction(dispatch, reviewId);

  return {
    setProductDetails,
    startProductDetailsLoading,
    stopProductDetailsLoading,
    productDetails,
    loading,
    addReview,
    updateReview,
    deleteReview,
  };
};
