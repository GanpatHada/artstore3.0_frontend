import React, { useEffect } from "react";
import "./Products.css";
import Product from "./components/product/Product";
import { toast } from "react-toastify";
import Filter from "./components/filter/Filter";
import SkeletonLoader from "../../components/skeleton_loader/SkeletonLoader";
import { filteredProducts } from "../../utils/FilterHelper";
import { useProducts } from "../../hooks/useProducts";
import { fetchProducts } from "../../services/ProductService";
import { useFilters } from "../../hooks/useFilters";

const ProductsHeader = ({ totalShowingProducts }) => {
  const { products } = useProducts();
  const totalProducts = products.length;

  return (
    <section id="products-count">
      showing <strong>{totalShowingProducts}</strong> results out of{" "}
      <strong>{totalProducts}</strong> results
    </section>
  );
};

const NoProducts = () => {
  return (
    <div id="no-products" className="all-centered">
      <h4>
        <strong>opps!</strong>
      </h4>
      <p>No products found</p>
    </div>
  );
};

const ProductsList = ({ getFilteredProducts, totalShowingProducts }) => {
  const { productsLoading } = useProducts();

  if (productsLoading) return <SkeletonLoader />;
  if (totalShowingProducts === 0) return <NoProducts />;
  return (
    <div id="products">
      {getFilteredProducts().map((product) => {
        return <Product productData={product} key={product._id} />;
      })}
    </div>
  );
};

const Products = () => {
  const { products, startProductsLoading, stopProductsLoading, setProducts } =
    useProducts();
  const { state: filters } = useFilters();

  const handleFetchProducts = async () => {
    try {
      startProductsLoading();
      const productsList = await fetchProducts();
      setProducts(productsList);
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      stopProductsLoading();
    }
  };

  useEffect(() => {
    if (products.length === 0) handleFetchProducts();
  }, []);

  const getFilteredProducts = () => {
    return filteredProducts(products, filters);
  };

  const totalShowingProducts = getFilteredProducts().length;

  return (
    <div id="products-page">
      <ProductsHeader totalShowingProducts={totalShowingProducts} />
      <section id="products-content">
        <aside id="filters">
          <Filter />
        </aside>
        <div id="products-wrapper">
          <ProductsList
            getFilteredProducts={getFilteredProducts}
            totalShowingProducts={totalShowingProducts}
          />
        </div>
      </section>
    </div>
  );
};

export default Products;
