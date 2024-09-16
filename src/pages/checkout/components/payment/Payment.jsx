
import "./Payment.css";
import rzpIcon from '../../../../images/Razorpay_logo.svg';
import loader from '../../../../images/spinner.svg'
import { createRazorpayOrder } from "../../../../services/PaymentService";
import { toast } from "react-toastify";
import { loadRazorpayScript } from "../../../../utils/PaymentHelper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false);
  const makePayment=async(amount)=>{
    setLoading(true)
    try {
      const result=await createRazorpayOrder(amount);
      console.log(result);
      if(!result.success)
        return toast.error(result.message); 
      await handleRazorpayScreen(result.data.amount,result.data.id)
    } catch (error) {
      toast.error("Internal server error")
    }
    finally{
      setLoading(false)
    }
  }
  
  const handleRazorpayScreen = async (amount,orderId) => {
    try {
      const response = await loadRazorpayScript();
      if (!response) 
        return toast.error("not able to load script");
    } catch (error) {
      throw error;
    }
    const options = {
      key: "rzp_test_fRB3NnfTuDhzWw",
      order_id: orderId,
      amount: amount,
      currency: "INR",
      name: "Artstore",
      description: "payment to artstore",
      image: "...",
      handler: function (response) {
        const{razorpay_order_id,razorpay_payment_id,razorpay_signature}=response;
        navigate(`/payment-success/${razorpay_order_id}/${razorpay_payment_id}/${razorpay_signature}`)
      },
      prefill: {
        name: "artstore",
        email: "artstore@gmail.com",
      },
      theme: {
        color: "#3897ce",
      },
      config: {
        service_worker: {
          enabled: false,
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section id="payment-section">
      <h2>Make Payment</h2>
      <div id="payment-box">
        <span id="payment-info">
          <p>Total amount to be paid : &#8377; <strong>1234</strong></p>
          <i>(incl. all taxes)</i>
        </span>
        <div>
        <button id="make-payment-btn" onClick={() => makePayment(100)}>
          Confirm payment of &#8377;2345{" "}
        </button>
       {loading&&<img src={loader} alt="..." />}
        </div>
        
        <span id="rzp-add">Powered by<img src={rzpIcon} alt="" /> </span>
      </div>
    </section>
  );
};

export default Payment;
