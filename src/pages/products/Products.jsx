import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import Product from "./components/product/Product";
import { getProducts } from "../../services/ProductService";
import { toast } from "react-toastify";
import { ProductContext } from "../../context/ProductContext";
import Filter from "./components/filter/Filter";
import SkeletonLoader from "../../components/skeleton_loader/SkeletonLoader";
import { filteredProducts } from "../../utils/FilterHelper";
const Products = () => {
  const [loading, setLoading] = useState(false);
  const {state: { filters, products },dispatch} = useContext(ProductContext);


  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await getProducts();
      if (!result.success) return toast.error(result.message);
      return dispatch({ type: "SET_PRODUCTS", payload: result.data });
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, []);

  const getFilteredProducts = () => {
    return filteredProducts(products, filters);
  };

  return (
    <div id="products-page">
      <section id="products-count">
        showing <strong>{getFilteredProducts().length}</strong> results out of{" "}
        <strong>{products.length}</strong> results
      </section>
      <section id="products-content">
        <aside id="filters">
          <Filter />
        </aside>
        <div id="products-wrapper">
          {!loading ? (
            <>
              {getFilteredProducts().length > 0 ? (
                <section id="products">
                  {products.length > 0 &&
                    getFilteredProducts().map((product) => {
                      return (
                        <Product productData={product} key={product._id} />
                      );
                    })}
                </section>
              ) : (
                <div id="no-products" className="all-centered">
                  <strong>opps!No products found</strong>
                </div>
              )}
            </>
          ) : (
            <SkeletonLoader />
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
