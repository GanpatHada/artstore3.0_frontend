import React from "react";
import "./ProductImage.css";
const ProductImage = ({imageUrl}) => {
  return (
    <section id="image-section">
      <img src={imageUrl} alt="n/a" />
    </section>
  );
};

export default ProductImage;
