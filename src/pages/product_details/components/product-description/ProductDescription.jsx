import React from "react";
import "./ProductDescription.css";
const ProductDescription = ({ descriptions }) => {
  return (
    <div id="product-descriptions">
      <h4>About this Product</h4>
      <ul>
        {descriptions.map((des, index) => {
          return <li key={index}>{des}</li>;
        })}
      </ul>
    </div>
  );
};

export default ProductDescription;
