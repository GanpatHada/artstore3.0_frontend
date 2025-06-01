import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { useUser } from "../../../../hooks/useUser";
import { fetchOrderDetails } from "../../../../services/OrderService";

const Order = ({ order }) => {

  const[orderDetails,setOrderDetails]=useState(null);
  const[loading,setLoading]=useState(true);
  const user=useUser()

  const getOrderDetails = async () => {
    try {
      const data=await fetchOrderDetails(user,order);
      setOrderDetails(data);
    } catch (error) {
      
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getOrderDetails()
  }, []);

  return (
    <div className="order">
      {
        loading?<p>Loading...</p>:
        <header>
        <ul>
          <li>
            <h2>Order Placed</h2>
            <p>{orderDetails.order.createdAt.split("T")[0]}</p>
          </li>
          <li>
            <h2>Total</h2>
            <p>{orderDetails.order.totalAmount}</p>
          </li>
          <li>
            <h2>Ship to</h2>
            <p>{orderDetails.deliveryAddress.receiverName}</p>
          </li>
          <li>
            <h2>Order id</h2>
            <p>{orderDetails.order.orderId.replace("order_","")}</p>
          </li>
        </ul>
      </header>
      }
      
    </div>
  );
};

const MyOrders = () => {
  const {
    user: { myOrders },
  } = useUser();
  console.log(myOrders);
  return (
    <div id="my-orders-box">
      <h2>Your Orders</h2>
      <p>list of products that you have purchased</p>
      <div id="orders-content">
        {myOrders.map((order,index) => {
          return <Order key={index} order={order} />;
        })}
        {/* <SpinLoader size={36}  />    */}
      </div>
    </div>
  );
};

export default MyOrders;
