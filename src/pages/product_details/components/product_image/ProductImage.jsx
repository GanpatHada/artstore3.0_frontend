import React from "react";
import "./ProductImage.css";
const ProductImage = ({productImages}) => {
  return (
    <section id="image-section">
      <img src={productImages[0]} alt="n/a" />
    </section>
  );
};

export default ProductImage;
