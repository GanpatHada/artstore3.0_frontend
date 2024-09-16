import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DotLoader from '../../components/dot-loader/DotLoader'
import './Order.css'
const Order = () => {
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=useParams();
  console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature)
  const verifySignature=async()=>{

  }

  useEffect(()=>{
     verifySignature()
  },[])
  return (
    <div id='order-success-page'>
        {/* <p>Verifying Payment<DotLoader/></p> */}
        <div id="payment-success-box">
            <h2><span><i className="fa-solid fa-circle-check"></i></span> Order Placed, thanks</h2>
            <span>
                Confirmation will be sent to your email 
            </span>
            <p>For more details kindly visit <Link to={'/my_account/orders'}>orders</Link></p>section of your account
        </div>
    </div>
  )
}

export default Order