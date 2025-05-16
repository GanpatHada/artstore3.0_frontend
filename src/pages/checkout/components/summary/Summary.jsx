import React from "react";
import "./Summary.css";
import { useCheckout } from "../../../../hooks/useCheckout";
const Summary = () => {
  const{amount,products}=useCheckout()
  return (
    <div id="summary-box">
      <h2>Summary</h2>
      <div id="summary-box-content">
          <p>items{`(${products.length})`} : <span>{amount?.toLocaleString("en-IN")}</span></p>
          <p>Delivery : <span>{amount<500?50:0}</span></p>
          <p>Cash on Delivery charge : <span>{0}</span></p>

      </div>
    </div>
  );
};

export default Summary;
