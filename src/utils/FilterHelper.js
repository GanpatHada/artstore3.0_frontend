import { calculateAverageRating, calculatePrice } from "./ProductHelper";

const getMaximumRange = (range) => {
    if (range === 10000) return Infinity;
    return range;
  };

export function filteredProducts(products,filters) {


  let filteredProducts = products;

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
      (product) => calculateAverageRating(product.ratings) >= filters.ratings
    );
  if (filters.sortBy) {
    if (filters.sortBy === "MAXIMUM_DISCOUNT")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) => product2.discount - product1.discount
      );

    if (filters.sortBy === "TOP_RATINGS")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) =>
          calculateAverageRating(product2.ratings) -
          calculateAverageRating(product1.ratings)
      );

    if (filters.sortBy === "PRICE_LOW_TO_HIGH")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) =>
          calculatePrice(product1.discount, product1.price) -
          calculatePrice(product2.discount, product2.price)
      );

    if (filters.sortBy === "PRICE_HIGH_TO_LOW")
      filteredProducts = [...filteredProducts].sort(
        (product1, product2) =>
          calculatePrice(product2.discount, product2.price) -
          calculatePrice(product1.discount, product1.price)
      );
  }
  console.log(filteredProducts);
  return filteredProducts;
}
