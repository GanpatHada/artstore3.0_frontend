import React, { useEffect, useState } from "react";
import "./Categories.css";
import { fetchSpecialProducts } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { makeCapitalize } from "../../../../utils/GlobalUtils";

const LoadingSkeleton = () => (
  <div className="loading-skeleton">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="skeleton-card">
      </div>
    ))}
  </div>
);

const ExploreBox = () => (
  <main id="explore-box" className="all-centered">
    <p>Explore Artstore</p>
    <Link to={"/products"}>
      <button className="secondary-btn">Explore</button>
    </Link>
  </main>
);

const PickupWhereYouLeftOff = ({ handleProductClick }) => {
  const products = JSON.parse(localStorage.getItem("viewedProducts")) || [];

  return (
    <div className="category-wrapper">
      <header>
        <h4>Pickup where you left off</h4>
      </header>
      <main>
        {products.length === 0 ? (
          <ExploreBox />
        ) : (
          <section>
            {products.map((product) => (
              <div
                key={product.productId}
                onClick={() => handleProductClick(product.productId)}
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
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

const ProductCategory = ({
  title,
  products,
  loading,
  handleProductClick,
  showPrice,
  showTag,
  showDiscount,
}) => {
  return (
    <div className="category-wrapper">
      <header>
        <h4>{title}</h4>
      </header>
      <main>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <section>
            {products?.map((product) => (
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
                {showPrice && (
                  <span>
                    <strong>&#8377;{product?.price} &nbsp;</strong>
                    {showDiscount && (
                      <span className="high-discount">
                        {product.discount}% off
                      </span>
                    )}
                  </span>
                )}
                {showTag && (
                  <span className="tag">{makeCapitalize(product.tag)}</span>
                )}
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

  const [loading, setLoading] = useState(false);
  const [specialProducts, setSpecialProducts] = useState({
    under1k: [],
    highDiscount: [],
    limitedDeal: [],
  });

  const getSpecialProducts = async () => {
    try {
      setLoading(true);
      const products = await fetchSpecialProducts();
      setSpecialProducts({
        under1k: products?.under1k || [],
        highDiscount: products?.highDiscount || [],
        limitedDeal: products?.limitedDeal || [],
      });
    } catch (error) {
      toast.error(
        error.message || "Something went wrong while fetching products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpecialProducts();
  }, []);

  return (
    <section id="categories">
      <PickupWhereYouLeftOff handleProductClick={handleProductClick} />
      <ProductCategory
        title="Products under 1,000 Rs."
        products={specialProducts.under1k}
        loading={loading}
        handleProductClick={handleProductClick}
        showPrice
      />
      <ProductCategory
        title="Deal of the day"
        products={specialProducts.limitedDeal}
        loading={loading}
        handleProductClick={handleProductClick}
        showTag
      />
      <ProductCategory
        title="More than 50% off"
        products={specialProducts.highDiscount}
        loading={loading}
        handleProductClick={handleProductClick}
        showPrice
        showDiscount
      />
    </section>
  );
};

export default Categories;
