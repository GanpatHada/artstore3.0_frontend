import React from "react";
import "./ProductInfo.css";
import {
  calculatePrice,
} from "../../../../utils/ProductHelper";
import ProductActions from "../product_actions/ProductActions";
import ProductImage from "../product_image/ProductImage";
import ProductDescription from "../product-description/ProductDescription";
import StarsCreator from '../../../../components/stars_creator/StarsCreator'
import Ratings from "../ratings/Ratings";
import Reviews from '../reviews/Reviews'

const ProductInfo = ({ productDetails }) => {
  const { title, price, discount,productImages,category,descriptions,tags,artist:{averageRatings,reviews}} = productDetails;
  console.log(descriptions)

  return (
    <>
    <section id="info-section-wrapper">
      <ProductImage productImages={productImages} />
      <section id="info-section">
        <h3 id="title">{title}</h3>
        <h5 id="category">{category}</h5>
        <div id="artist-ratings"><span>{averageRatings}</span><StarsCreator starsCount={averageRatings}/><span>{reviews.length} reviews</span></div>
        <hr />
        {tags.length>0&& <div className="tag">{tags[0]}</div>}
        <span id="discount">{productDetails.discount}%</span> off <span>&#8377;</span>
        <strong>{calculatePrice(discount, price).toLocaleString()}</strong>
        <div>
          <strike id='actual-price'>M.R.P. : &#8377;{price.toLocaleString()}</strike>
        </div>
        <hr />
       <ProductDescription descriptions={descriptions}/>
      </section>
      <ProductActions productDetails={productDetails} />
    </section>
    <Ratings reviews={reviews} averageRatings={averageRatings} />
    <Reviews reviews={reviews} />
    </>
  );
};

export default ProductInfo;
