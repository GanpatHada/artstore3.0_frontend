import React from 'react'
import './MyOrders.css'
import { useUser } from '../../../../hooks/useUser'
const MyOrders = () => {
  const{user}=useUser();
  return (
    <div id='my-orders-box'>
        <h2>Your Orders</h2>
        <p>list of products that you have purchased</p>
        <div id="orders-content">
             {/* {user} */}
        </div>
    </div>
  )
}

export default MyOrders
