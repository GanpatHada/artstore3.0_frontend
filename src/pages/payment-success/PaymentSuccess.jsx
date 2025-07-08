import './PaymentSuccess.css'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import OrderDetails from '../account/components/order-details/OrderDetails';
import {useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  console.log('render')
  const location=useLocation();
  const order=location.state;
  console.log(order)

  return (
    <div id='payment-success-page'>
         <div id='payment-success-wrapper'>
            <h3><span className='all-centered'><IoCheckmarkCircleSharp /></span>Order placed, Thankyou</h3>
            <p>Thankyou for shopping with us, below are the details of your order</p>
         </div>
         <OrderDetails order={order}/>
    </div>
  )
}

export default PaymentSuccess
