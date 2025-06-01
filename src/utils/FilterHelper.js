import { calculateAverageRating, calculatePrice } from "./ProductHelper";

const getMaximumRange = (range) => {
    if (range === 10000) return Infinity;
    return range;
  };

export function filteredProducts(products,filters) {


  let filteredProducts = products;

  console.log(products)

  filteredProducts = filteredProducts.filter(
    (product) =>
      calculatePrice(product.discount, product.price) >=
        filters.priceRange[0] &&
      calculatePrice(product.discount, product.price) <=
        getMaximumRange(filters.priceRange[1])
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
         (product2.averageRatings) - (product1.averageRatings)
      );

    if (filters.sortBy === "PRICE_LOW_TO_HIGH")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) =>
          (product1.averageRatings) - (product2.averageRatings)
      );

    if (filters.sortBy === "PRICE_HIGH_TO_LOW")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) =>
          calculatePrice(product2.discount, product2.price) -
          calculatePrice(product1.discount, product1.price)
      );
  }
  return filteredProducts;
}
