import React from "react";
import "./ProductInfo.css";
import {
  calculateAverageRating,
  calculatePrice,
} from "../../../../utils/ProductHelper";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import ProductActions from "../product_actions/ProductActions";
import About from "../about/About";
import ProductImage from "../product_image/ProductImage";
const ProductInfo = ({ productDetails }) => {
  const { title, price, discount, ratings, imageUrl,category } = productDetails;
  return (
    <section id="info-section-wrapper">
      <ProductImage imageUrl={imageUrl} />
      <section id="info-section">
        <h3 id="title">{title}</h3>
        <h5 id="category">{category}</h5>
        <section>
          <span>{calculateAverageRating(ratings)}</span>
          <span>
            <StarsCreator starsCount={calculateAverageRating(ratings)} />
          </span>
          <span>{productDetails.ratings.length} Ratings</span>
        </section>
        <hr />
        {productDetails.discount}% off<span>&#8377;</span>
        <strong>{calculatePrice(discount, price)}</strong>
        <div>
          <strike>{price}</strike>
        </div>
        <hr />
        <About />
      </section>
      <ProductActions productDetails={productDetails} />
    </section>
  );
};

export default ProductInfo;
