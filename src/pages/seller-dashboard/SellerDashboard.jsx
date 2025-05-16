import React from "react";
import "./SellerDashboard.css";
import AddProduct from "../add-product/AddProduct";
const SellerDashboard = () => {
  return (
    <div id="seller-dashboard">
      <nav><span className="main-logo-text">artstore</span></nav>
      <main className="all-centered">
        <AddProduct/>
      </main>
      <footer>this is footer</footer>
    </div>
  );
};

export default SellerDashboard;
