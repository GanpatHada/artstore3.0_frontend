import React from "react";
import "./OrderDetails.css";

const ShippingAddress = () => {
  return (
    <div>
      <header>
        <h5>Ship to</h5>
      </header>
      <main>
        <p>Ganpat Hada</p>
        <p>Sri Rama pg</p>
        <p>Mahadevpura,KR puram</p>
        <p>Bengaluru,Karnataka,458778</p>
        <p>7845125478</p>
      </main>
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div>
      <header>
        <h5>Payment Methods</h5>
      </header>
      <main>
        <p>Razorpay</p>
      </main>
    </div>
  );
};

const OrderSummary = () => {
  return (
    <div>
      <header>
        <h5>Order Summary</h5>
      </header>
      <main>
        <p>
          Items(4) Subtotal: <span>500</span>
        </p>
        <p>
          Shipping: <span>89</span>
        </p>
        <p>
          <strong>Grand Total:</strong>
          <span>
            <strong>5433</strong>
          </span>
        </p>
        <p></p>
      </main>
    </div>
  );
};



const OrderInfo = () => {
  return (
    <div id="order-info">
      <ShippingAddress />
      <PaymentMethods />
      <OrderSummary />
    </div>
  );
};

const OrderDetails = () => {
  return (
    <div id="order-details">
      <header>
        <h1>Order Details</h1>
        <div>
          <p>Order place 1 September 2021</p>
          <p>Order number 405-53543-3453-345</p>
        </div>
      </header>
      <main>
        <OrderInfo />
       
      </main>
    </div>
  );
};

export default OrderDetails;
