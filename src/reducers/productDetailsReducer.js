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
    case "ADD_REVIEW":
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          reviews: [action.payload, ...state.productDetails.reviews],
        },
      };
    case "DELETE_REVIEW":
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          reviews: state.productDetails.reviews.filter(
            (review) => review._id.toString() !== action.payload.toString()
          ),
        },
      };
    case "UPDATE_REVIEW":
      if (!state.productDetails) return state;
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          reviews: (state.productDetails.reviews || []).map((review) =>
            review._id?.toString() === action.payload._id?.toString()
              ? action.payload
              : review
          ),
        },
      };
      default : return state;
  }
};

export default productDetailsReducer;
