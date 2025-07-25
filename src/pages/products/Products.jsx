import { useEffect, useState } from "react";
import "./Products.css";
import Product from "./components/product/Product";
import { toast } from "react-toastify";
import Filter from "./components/filter/Filter";
import { filteredProducts, getAppliedFilters } from "../../utils/FilterHelper";
import { useProducts } from "../../hooks/useProducts";
import { fetchProducts } from "../../services/ProductService";
import { useFilters } from "../../hooks/useFilters";
import { FaAngleDown } from "react-icons/fa6";
import MobileFilter from "./components/mobile_filter/MobileFilter";
import TopLoading from "../../components/top-loading/TopLoading";
import { GoRows } from "react-icons/go";
import { IoGridOutline } from "react-icons/io5";

const ProductsHeader = ({ totalShowingProducts }) => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const closeMobileFilter = () => setShowMobileFilter(false);
  const { products,view,toggleView} = useProducts();
  const { state } = useFilters();
  const totalProducts = products.length;

  return (
    <>
      {showMobileFilter && (
        <MobileFilter closeMobileFilter={closeMobileFilter} />
      )}
      <header id="products-header">
        <p>
          {" "}
          showing <strong>{totalShowingProducts}</strong> results out of{" "}
          <strong>{totalProducts}</strong> results
        </p>
        <div>
          <button id="view-button" onClick={toggleView}>
            View
            <span className="all-centered"> {view==='GRID'?<GoRows />:<IoGridOutline />}</span>
          </button>
          <button id="filter-button" onClick={() => setShowMobileFilter((prev) => !prev)}>
            Filters ({getAppliedFilters(state).count}){" "}
            <span className="all-centered">
              <FaAngleDown />
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

const NoProducts = () => {
  const { state } = useFilters();
  return (
    <div id="no-products" className="all-centered">
      <h4>
        <strong>opps!</strong>
      </h4>
      <p>
        !No products found{" "}
        {getAppliedFilters(state).count > 0 && (
          <span>Try with different filters</span>
        )}
      </p>
    </div>
  );
};

const ProductsList = ({ getFilteredProducts, totalShowingProducts }) => {
  const { view } = useProducts();
  if (totalShowingProducts === 0) return <NoProducts />;
  return (
    <div id="products" className={view.toLowerCase()}>
      {getFilteredProducts().map((product) => {
        return <Product productData={product} view={view} key={product._id} />;
      })}
    </div>
  );
};

const Products = () => {
  const { products, stopProductsLoading, setProducts, productsLoading } =
    useProducts();
  const { state: filters } = useFilters();

  const handleFetchProducts = async () => {
    try {
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
      {productsLoading ? (
        <TopLoading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Products;
