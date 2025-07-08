import React, { useEffect, useState } from "react";
import "./Products.css";
import Product from "./components/product/Product";
import { toast } from "react-toastify";
import Filter from "./components/filter/Filter";
import SkeletonLoader from "../../components/skeleton_loader/SkeletonLoader";
import { filteredProducts, getAppliedFilters } from "../../utils/FilterHelper";
import { useProducts } from "../../hooks/useProducts";
import { fetchProducts } from "../../services/ProductService";
import { useFilters } from "../../hooks/useFilters";
import { FaAngleDown } from "react-icons/fa6";
import MobileFilter from "./components/mobile_filter/MobileFilter";

const ProductsHeader = ({ totalShowingProducts }) => {
  const [showMobileFilter,setShowMobileFilter]=useState(false);
  const closeMobileFilter=()=>setShowMobileFilter(false)
  const { products } = useProducts();
  const {state}=useFilters()
  const totalProducts = products.length;

  return (
    <>
    {showMobileFilter && <MobileFilter closeMobileFilter={closeMobileFilter}/>}
    <header id="products-header">
       <p> showing <strong>{totalShowingProducts}</strong> results out of{" "}
      <strong>{totalProducts}</strong> results</p>
      <button onClick={()=>setShowMobileFilter(prev=>!prev)}>Filters ({getAppliedFilters(state).count}) <span className="all-centered"><FaAngleDown /></span></button>
    </header>
    </>
  );
};

const NoProducts = () => {
  const {state}=useFilters()
  return (
    <div id="no-products" className="all-centered">
      <h4>
        <strong>opps!</strong>
      </h4>
      <p>No products found</p>
     {getAppliedFilters(state).count>0&& <p>Try with different filters</p>}
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
        <main id="products-wrapper">
          <ProductsList
            getFilteredProducts={getFilteredProducts}
            totalShowingProducts={totalShowingProducts}
          />
        </main>
      </section>
    </div>
  );
};

export default Products;
