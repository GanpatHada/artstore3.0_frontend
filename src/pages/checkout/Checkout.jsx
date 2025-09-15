import { IoBagCheckOutline } from "react-icons/io5";
import "./Checkout.css";
import SelectAddress from "./components/select_address/SelectAddress";
import Payment from "./components/payment/Payment";
import Summary from "./components/summary/Summary";
import logo from '../../images/Artstore.svg'
const Checkout = () => {
  return (
    <div id="checkout-page">
      <header>
        <img src={logo} alt="" />
        <h1>Checkout</h1>
        <span className="all-centered"><IoBagCheckOutline /></span>
      </header>
      <div id="checkout-page-wrapper">
        <div>
          <SelectAddress />
          <Summary/>
          <Payment/>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
