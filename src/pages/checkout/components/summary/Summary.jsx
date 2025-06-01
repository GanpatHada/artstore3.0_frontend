import React from "react";
import "./Summary.css";
import { useCheckout } from "../../../../hooks/useCheckout";
const Summary = () => {
  const{amount,products}=useCheckout();
  const deliveryCharge=()=>amount<500?50:0
  return (
    <div id="summary-box">
      <h2>Summary</h2>
      <div id="summary-box-content">
          <p>items{`(${products.length})`} : <span>{amount-deliveryCharge()}</span></p>
          <p>Delivery charge : <span>{deliveryCharge()}</span></p>
          <p>Cash on Delivery charge : <span>{0}</span></p>
          <h2>Order Total : <span>{amount}</span></h2>

      </div>
    </div>
  );
};

export default Summary;
