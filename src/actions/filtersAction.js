export const setSearchTypeAction=(dispatch,searchType)=>dispatch({type:'SET_SEARCH_TYPE',payload:searchType})
export const setSearchTextAction=(dispatch,searchText)=>dispatch({type:'SET_SEARCH_TEXT',payload:searchText})

export const setCategoryFilterAction=(dispatch,category)=>dispatch({type:'SET_CATEGORY_FILTER',payload:category.toUpperCase()});
export const removeCategoryFilterAction=(dispatch,category)=>dispatch({type:'REMOVE_CATEGORY_FILTER',payload:category.toUpperCase()})

export const setMinimumRatingFilterAction=(dispatch,ratings)=>dispatch({type:'SET_MINIMUM_RATING_FILTER',payload:ratings})

export const setPriceRangeFilterAction=(dispatch,range)=>dispatch({type:'SET_PRICE_RANGE',payload:range})

export const setSortByFilterAction=(dispatch,sortBy)=>dispatch({type:'SET_SORT_BY',payload:sortBy})

export const clearFilterAction=(dispatch)=>dispatch({type:'CLEAR_FILTERS'})