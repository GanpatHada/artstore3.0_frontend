import React, { useEffect, useState } from "react";
import "./Categories.css";
import { fetchLimitedTimeDealProducts, fetchMinimumFiftyOffProducts, fetchUnderOneThousandProducts } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const LoadingSkelton=()=>{
  return <section className="loading-skeleton">
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
  </section>
}

const PickupWhereYouLeftOff = ({handleProductClick}) => {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    let viewedProducts=JSON.parse(localStorage.getItem("viewedProducts")) || [];
    setProducts(viewedProducts);
  },[])
  return (
    <div>
      <h4>Pickup where you left off</h4>
      <section>
      {products.map((product) => (
          <div key={product.productId} onClick={()=>handleProductClick(product._id)}>
            <img src={product.productImage} alt="" />
          </div>
      ))}
      </section>
     
    </div>
  );
};
const ProductsUnder1k = ({handleProductClick}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const getProductsUnderOneThousand = async () => {
    try {
      setLoading(true);
      const products = await fetchUnderOneThousandProducts();
      setProducts(products);
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsUnderOneThousand();
  }, []);
  return (
    <div>
      <h4>Products under 1,000 Rs.</h4>
      {loading?<LoadingSkelton/>:<section>
        {products.map((product) => (
          <div key={product._id} onClick={()=>handleProductClick(product._id)}>
            <img src={product.productImages[0]} alt="" />
          </div>
        ))}
      </section>}
    </div>
  );
};
const DealOfTheDay = ({handleProductClick}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const productsOnLimitedTimeDeal = async () => {
    try {
      setLoading(true);
      const products = await fetchLimitedTimeDealProducts();
      setProducts(products);
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productsOnLimitedTimeDeal();
  }, []);
  return (
    <div>
      <h4>Deal of the day</h4>
      {loading?<LoadingSkelton/>:<section>
        {products.map((product) => (
          <div key={product._id} onClick={()=>handleProductClick(product._id)}>
            <img src={product.productImages[0]} alt="" />
          </div>
        ))}
      </section>}
    </div>
  );
};
const UpToFiftyOff = ({handleProductClick}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getMinimumFiftyOffProducts = async () => {
    try {
      setLoading(true);
      const products = await fetchMinimumFiftyOffProducts();
      setProducts(products);
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMinimumFiftyOffProducts();
  }, []);
  return (
    <div>
      <h4>Up to 50% off</h4>
      {loading?<LoadingSkelton/>:<section>
        {products.map((product) => (
          <div key={product._id} onClick={()=>handleProductClick(product._id)}>
            <img src={product.productImages[0]} alt="" />
          </div>
        ))}
      </section>}
    </div>
  );
};

const Categories = () => {
  const navigate=useNavigate();

  const handleProductClick=(productId)=>navigate(`/products/${productId}`)
  

  return (
    <section id="categories">
      <PickupWhereYouLeftOff handleProductClick={handleProductClick} />
      <ProductsUnder1k handleProductClick={handleProductClick} />
      <DealOfTheDay handleProductClick={handleProductClick} />
      <UpToFiftyOff handleProductClick={handleProductClick} />
    </section>
  );
};
export default Categories;
