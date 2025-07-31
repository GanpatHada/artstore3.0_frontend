import './PaymentSuccess.css'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import OrderDetails from '../account/components/order-details/OrderDetails';
import {Link, useLocation} from 'react-router-dom';

const PaymentSuccess = () => {
  const location=useLocation();
  const order=location.state;

  return (
    <div id='payment-success-page'>
         <div id='payment-success-wrapper'>
            <h3><span className='all-centered'><IoCheckmarkCircleSharp /></span>Order placed, Thankyou</h3>
            <p>Thankyou for shopping with us, below are the details of your order</p>
         </div>
        {order?<OrderDetails order={order}/>:
        <p className='order-details-info'>For your order details <Link to={'/my_account/orders'}>click here</Link></p>}
    </div>
  )
}

export default PaymentSuccess
