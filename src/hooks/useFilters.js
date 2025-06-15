import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import {
  clearFilterAction,
  removeCategoryFilterAction,
  setCategoryFilterAction,
  setMinimumRatingFilterAction,
  setPriceRangeFilterAction,
  setSearchTextAction,
  setSearchTypeAction,
  setSortByFilterAction,
} from "../actions/filtersAction";

export const useFilters = () => {
  const { state, dispatch } = useContext(FilterContext);

  const setSearchType=(searchType)=>
    setSearchTypeAction(dispatch,searchType)

  const setSearchText=(searchText)=>
    setSearchTextAction(dispatch,searchText)

  const setCategoryFilter = (category) =>
    setCategoryFilterAction(dispatch, category);

  const removeCategoryFilter = (category) =>
    removeCategoryFilterAction(dispatch, category);

  const setMinimumRatingFilter = (minRatings) =>
    setMinimumRatingFilterAction(dispatch, minRatings);

  const setPriceRangeFilter = (priceRange) =>
    setPriceRangeFilterAction(dispatch, priceRange);

  const setSortByFilter = (sortBy) => 
    setSortByFilterAction(dispatch, sortBy);

  const clearFilter=()=>clearFilterAction(dispatch)

  return {
    state,
    setSortByFilter,
    removeCategoryFilter,
    setCategoryFilter,
    setMinimumRatingFilter,
    setPriceRangeFilter,
    clearFilter,
    setSearchText,
    setSearchType
  };
};
