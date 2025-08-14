import React, { useEffect, useState } from "react";
import "./Categories.css";
import {
  fetchLimitedTimeDealProducts,
  fetchMinimumFiftyOffProducts,
  fetchUnderOneThousandProducts,
} from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { makeCapitalize } from "../../../../utils/GlobalUtils";

const LoadingSkelton = () => {
  return (
    <section className="loading-skeleton">
      <div className="skeleton"></div>
      <div className="skeleton"></div>
      <div className="skeleton"></div>
      <div className="skeleton"></div>
    </section>
  );
};

const ExploreBox = () => {
  return (
    <main id="explore-box" className="all-centered">
      <p>Explore Artstore</p>
      <Link to={"/products"}><button className="secondary-btn">Explore</button></Link>
    </main>
  );
};

const PickupWhereYouLeftOff = ({ handleProductClick }) => {
  const products = JSON.parse(localStorage.getItem("viewedProducts")) || [];

  return (
    <div className="category-wrapper">
      <header>
        <h4>Pickup where you left off</h4>
      </header>
      {products.length === 0 ? (
        <main>
          <ExploreBox />
        </main>
      ) : (
        <main>
          <section>
            {products.map((product) => (
              <div key={product.productId}
                  onClick={() => handleProductClick(product._id)}>
                <div className="product-image-wrapper">
                  <div
                  className="product-image"
                  style={{
                    backgroundImage: `url(${
                      product.productImage || "/fallback.jpg"
                    })`,
                  }}
                ></div>
                </div>
              </div>
            ))}
          </section>
        </main>
      )}
    </div>
  );
};
const ProductsUnder1k = ({ handleProductClick }) => {
  const [loading, setLoading] = useState(true);
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
    <div className="category-wrapper">
      <header>
        <h4>Products under 1,000 Rs.</h4>
      </header>
      <main>
        {loading ? (
          <LoadingSkelton />
        ) : (
          <section>
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
              >
                <div className="product-image-wrapper">
                  <div
                  className="product-image"
                  style={{
                    backgroundImage: `url(${
                      product.productImage || "/fallback.jpg"
                    })`,
                  }}
                ></div>
                </div>
                <section className="product-info">
                  <span>
                    <strong>&#8377;{product?.price}</strong>
                  </span>
                  &nbsp;
                  <strike>&#8377;{product?.actualPrice}</strike>
                </section>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};
const DealOfTheDay = ({ handleProductClick }) => {
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
    <div className="category-wrapper">
      <header>
        <h4>Deal of the day</h4>
      </header>
      <main>
        {loading ? (
          <LoadingSkelton />
        ) : (
          <section>
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
              >
               <div className="product-image-wrapper">
                  <div
                  className="product-image"
                  style={{
                    backgroundImage: `url(${
                      product.productImage || "/fallback.jpg"
                    })`,
                  }}
                ></div>
                </div>
                <section>
                  <span className="tag">{makeCapitalize(product?.tag)}</span>
                </section>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};
const UpToFiftyOff = ({ handleProductClick }) => {
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
    <div className="category-wrapper">
      <header>
        <h4>More than 50% off</h4>
      </header>
      <main>
        {loading ? (
          <LoadingSkelton />
        ) : (
          <section>
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
              >
                <div className="product-image-wrapper">
                  <div
                  className="product-image"
                  style={{
                    backgroundImage: `url(${
                      product.productImage || "/fallback.jpg"
                    })`,
                  }}
                ></div>
                </div>
                <section>
                  <span>
                    <strong>&#8377;{product?.price}</strong>
                  </span>
                  &nbsp;
                  <span className="high-discount">
                    {product?.discount}% off
                  </span>
                </section>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

const Categories = () => {
  const navigate = useNavigate();
  const handleProductClick = (productId) => navigate(`/products/${productId}`);

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
