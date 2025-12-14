import rzpIcon from "../../../../images/Razorpay_logo.svg";
import loader from "../../../../images/spinner.svg";
import { toast } from "react-toastify";
import {
  getVerifyPaymentParams,
  loadRazorpayScript,
  razorpayOptions,
} from "../../../../utils/PaymentHelper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../../hooks/useCheckout";
import "./Payment.css";
import {
  fetchCreateOrder,
  fetchVerifyPayment,
} from "../../../../services/OrderService";
import { useUser } from "../../../../hooks/useUser";

const Payment = () => {
  const navigate = useNavigate();
  const { user,setUserDetails} = useUser();
  const { amount, products, address } = useCheckout();
  const deliveryCharge = amount < 500 ? 50 : 0;
  const totalAmount = amount + deliveryCharge;
  const [loading, setLoading] = useState(false);


  const createOrder = async (totalAmount) => {
    try {
      setLoading(true);
      const createdOrder = await fetchCreateOrder(user,totalAmount);
      return createdOrder;
    } catch (error) {
      toast.error(error.message || "Something went wrong during order creation");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async (totalAmount) => {
    const order = await createOrder(totalAmount);
    if (!order) return;
    await handleRazorpayScreen(order.amount, order.id);
  };

  const initRazorpay = async () => {
    try {
      await loadRazorpayScript();
    } catch (error) {
      toast.error(error.message || "unable to load razorpay screeen");
    }
  }

  const handleRazorpayScreen = async (amount, order_id) => {
    await initRazorpay();

    const options = {
      ...razorpayOptions, order_id, amount,
      handler: async function (response) {
        const verifyPaymentParams = getVerifyPaymentParams(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature,
          products,
          address,
          amount,
          deliveryCharge
        )
        try {
          setLoading(true);
          const orderDetails = await fetchVerifyPayment(user,setUserDetails,verifyPaymentParams);  
          setUserDetails({...user,cart:orderDetails.updatedCart,myOrders:orderDetails.updatedMyOrders});
          navigate("/payment-success",{state:orderDetails})
        } catch (error) {
          toast.error(error.message || 'Something went wrong while finishing order')
        }
        finally{
          setLoading(false)
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  useEffect(() => {
    if (!amount) return navigate("/cart");
  });

  if (address)
    return (
      <section id="payment-section">
        <h2>Make Payment</h2>
        <div id="payment-box">
          <section id="payment-info">
            <p>Total amount to be paid : &#8377;{" "}<strong>{totalAmount?.toLocaleString("en-In")}</strong></p>
            <i>(incl. all taxes)</i>
          </section>
          <section id="payment-action">
            {!loading && (
              <button
                id="make-payment-btn"
                disabled={loading}
                onClick={() => makePayment(totalAmount)}
              >
                Confirm payment of &#8377;{totalAmount?.toLocaleString("en-In")}
              </button>
            )}
            {loading && <img src={loader} alt="..." />}
          </section>
          <section id="rzp-add">
            <span>Powered by</span><img src={rzpIcon} alt="" />{" "}
          </section>
        </div>
      </section>
    );
  else return <></>;
};

export default Payment;
