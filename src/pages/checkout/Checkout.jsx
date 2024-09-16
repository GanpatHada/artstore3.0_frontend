import React from "react";
import "./Checkout.css";
import SelectAddress from "./components/select_address/SelectAddress";
import Payment from "./components/payment/Payment";
const Checkout = () => {
  return (
    <div id="checkout-page">
      <header>
        <h1>Checkout</h1>
      </header>
      <div id="checkout-page-wrapper">
        <div>
          <SelectAddress />
          <Payment/>
        </div>
        <div>this is summary</div>
      </div>
    </div>
  );
};

export default Checkout;
