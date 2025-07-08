export const isPriceRangeFilterApplied = (priceRange) => {
  return priceRange[0] !== 0 || priceRange[1] !== 10000;
};


export const isCategoryFilterApplied=(categories)=>{
  return categories.length!==0
}

export const isRatingFilterApplied=(ratings)=>{
  return ratings!==null;
}

export const isSortByFilterApplied=(sortBy)=>{
  return sortBy!==null;
}

export const getAppliedFilters = ({ priceRange, categories, ratings, sortBy }) => {
  const applied = {
    priceRange: isPriceRangeFilterApplied(priceRange),
    categories: isCategoryFilterApplied(categories),
    ratings: isRatingFilterApplied(ratings),
    sortBy: isSortByFilterApplied(sortBy),
  };

  const appliedFilters = Object.keys(applied).filter(key => applied[key]);

  return {
    count: appliedFilters.length,
    filters: appliedFilters,
  };
};

const getMaximumRange = (range) => {
  if (range === 10000) return Infinity;
  return range;
};



export function filteredProducts(products, filters) {
  const { searchText, searchType } = filters;
  let filteredProducts = products;

  function searchByTitle(){
     return filteredProducts.filter((product) =>product.title.toLowerCase().includes(searchText.toLowerCase()));
  }

  function searchByCategory(){
     return filteredProducts.filter((product) =>product.category.toLowerCase().includes(searchText.toLowerCase()));
  }

  function searchByPrice(){
     return filteredProducts.filter((product) =>product.price===Number(searchText))
  }

  function searchAll(){
    return filteredProducts.filter((product) =>product.title.toLowerCase().includes(searchText.toLowerCase()) || 
    product.category.toLowerCase().includes(searchText.toLowerCase())||
    product.price===Number(searchText))  
  }

  if (searchText.trim().length > 0) {
    switch (searchType) {
      case "TITLE":filteredProducts = searchByTitle()
                   break;
      case "CATEGORY":filteredProducts = searchByCategory()
                   break;
      case "PRICE":filteredProducts = searchByPrice()
                   break;
      case "ALL":filteredProducts=searchAll()
                 break;   
      default: break;      

    }
  }

  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= getMaximumRange(filters.priceRange[1])
  );

  if (filters.categories.length !== 0)
    filteredProducts = filteredProducts.filter((product) =>
      filters.categories.includes(product.category)
    );
  if (filters.ratings)
    filteredProducts = filteredProducts.filter(
      (product) => product.averageRatings >= filters.ratings
    );
  if (filters.sortBy) {
    if (filters.sortBy === "MAXIMUM_DISCOUNT")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) => product2.discount - product1.discount
      );

    if (filters.sortBy === "TOP_RATINGS")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) =>
          product2.averageRatings - product1.averageRatings
      );

    if (filters.sortBy === "PRICE_LOW_TO_HIGH")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) => product1.price - product2.price)

    if (filters.sortBy === "PRICE_HIGH_TO_LOW")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) => product2.price - product1.price)
  }
  return filteredProducts;
}
