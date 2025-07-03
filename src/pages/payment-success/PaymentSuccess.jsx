import './PaymentSuccess.css'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import OrderDetails from '../account/components/order-details/OrderDetails';
import OrderItems from '../../order-items/OrderItems';

const PaymentSuccess = () => {
  return (
    <div id='payment-success-page'>
         <div id='payment-success-wrapper'>
            <h3><span className='all-centered'><IoCheckmarkCircleSharp /></span>Order placed, Thankyou</h3>
            <p>Thankyou for shopping with us, below are the details of your order</p>
         </div>
         <OrderDetails/>
         <OrderItems/>
    </div>
  )
}

export default PaymentSuccess
