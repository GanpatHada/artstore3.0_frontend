export const initialFilterState = {
  categories: [],
  priceRange: [0, 10000],
  ratings: null,
  sortBy: null,
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY_FILTER":
      return {
        ...state,
        categories: [...state.categories,action.payload],
      };
    case "REMOVE_CATEGORY_FILTER":
      return {
        ...state,
        categories: state.categories.filter(
          (value) => value !== action.payload
        ),
      };
    case "SET_MINIMUM_RATING_FILTER":
      return { ...state, ratings: action.payload };
    case "SET_PRICE_RANGE":
      return {
        ...state,
        priceRange: action.payload,
      };

    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        categories: [],
        priceRange: [0, 10000],
        ratings: null,
        sortBy: null,
      };
    default:
      return { ...state };
  }
};
