import React from "react";
import "./ProductImage.css";
import { useProductDetails } from "../../../../hooks/useProductDetails";
const ProductImage = () => {
  const {productDetails:{productImages}}=useProductDetails()
  return (
    <section id="image-section">
      <div id="product-image-wrapper">
        <img src={productImages[0]} alt="n/a" />
      </div>
    </section>
  );
};

export default ProductImage;
