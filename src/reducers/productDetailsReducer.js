import { calculateAverageRating } from "../utils/ProductDetailsHelper";

export const initialProductDetailsState = {
  productDetails: null,
  loading: false,
};



const productDetailsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT_DETAILS":
      return { ...state, productDetails: action.payload };

    case "START_LOADING":
      return { ...state, loading: true };

    case "STOP_LOADING":
      return { ...state, loading: false };

    case "ADD_REVIEW": {
      const updatedReviews = [action.payload, ...(state.productDetails.reviews || [])];
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          reviews: updatedReviews,
          averageRatings: calculateAverageRating(updatedReviews),
        },
      };
    }

    case "DELETE_REVIEW": {
      const updatedReviews = (state.productDetails.reviews || []).filter(
        (review) => review._id.toString() !== action.payload.toString()
      );
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          reviews: updatedReviews,
          averageRatings: calculateAverageRating(updatedReviews),
        },
      };
    }

    case "UPDATE_REVIEW": {
      if (!state.productDetails) return state;
      const updatedReviews = (state.productDetails.reviews || []).map((review) =>
        review._id?.toString() === action.payload._id?.toString()
          ? action.payload
          : review
      );
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          reviews: updatedReviews,
          averageRatings: calculateAverageRating(updatedReviews),
        },
      };
    }

    default:
      return state;
  }
};

export default productDetailsReducer;
