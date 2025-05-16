import React from "react";
import "./ProductDescription.css";
const ProductDescription = ({ descriptions }) => {
  console.log(descriptions);
  return (
    <div id="product-descriptions">
      <h4>About this Product</h4>
      <ul>
        {descriptions.map((description, index) => {
          return <li key={index}>{description}</li>;
        })}
      </ul>
    </div>
  );
};

export default ProductDescription;
