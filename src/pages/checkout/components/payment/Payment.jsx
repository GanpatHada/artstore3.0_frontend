import rzpIcon from "../../../../images/Razorpay_logo.svg";
import loader from "../../../../images/spinner.svg";
import { toast } from "react-toastify";
import { loadRazorpayScript, razorpayOptions } from "../../../../utils/PaymentHelper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../../hooks/useCheckout";
import "./Payment.css";
import { fetchCreateOrder, fetchVerifyPayment } from "../../../../services/OrderService";
import {useUser} from '../../../../hooks/useUser'


const Payment = () => {
  const navigate = useNavigate();
  const {user}=useUser()
  const { amount,products,selectedAddress } = useCheckout();
  console.log(products)
  const [loading, setLoading] = useState(false);
  const makePayment = async (amount) => {
    setLoading(true);
    try {
      const order = await fetchCreateOrder(amount);
      console.log(order)
      await handleRazorpayScreen(order.amount, order.id);
    } catch (error) {
      console.log(error)
      toast.error(error.message || "unable to transect at the moment");
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryCharge=()=>{
      const totalPrice=products.reduce((acc,cur)=>{
        acc=acc+cur.price;
        return acc;
      },0)
      return totalPrice<500?50:0
  }

  const handleRazorpayScreen = async (amount, orderId) => {
    try {
      const response = await loadRazorpayScript();
      if (!response) return toast.error("not able to load script");
    } catch (error) {
      throw error;
    }
    const options = {
      ...razorpayOptions,
      order_id: orderId,
      amount: amount,
      handler:async function (response) {
        await fetchVerifyPayment(user,response,selectedAddress,products,amount,getDeliveryCharge())

      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  useEffect(() => {
    if (!amount) return navigate("/cart");
  });

  if(selectedAddress)
    return (
    <section id="payment-section">
      <h2>Make Payment</h2>
      <div id="payment-box">
        <span id="payment-info">
          <p>
            Total amount to be paid : &#8377;{" "}
            <strong>{amount?.toLocaleString("en-In")}</strong>
          </p>
          <i>(incl. all taxes)</i>
        </span>
        <div>
          {!loading && <button id="make-payment-btn" disabled={loading} onClick={() => makePayment(amount)}>
            Confirm payment of &#8377;{amount?.toLocaleString("en-In")}
          </button>}
          {loading && <img src={loader} alt="..." />}
        </div>
        <span id="rzp-add">
          Powered by
          <img src={rzpIcon} alt="" />{" "}
        </span>
      </div>
    </section>
  );
  else
   return <></>
};

export default Payment;
