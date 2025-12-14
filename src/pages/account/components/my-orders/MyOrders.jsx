import { useEffect, useState } from "react";
import "./MyOrders.css";
import { fetchUserOrders } from "../../../../services/UserService";
import { useUser } from "../../../../hooks/useUser";
import OrderItems from "../../../../components/order-items/OrderItems";
import OrderImage from '../../../../images/boxIcon.svg'

const NoOrders=()=>{
  return(
    <div id="no-orders" className="all-centered">
         <div>
          <section className="image">
          <img src={OrderImage} alt="" />
         </section>
         <p>No orders found</p>
         </div>
    </div>
  )
}

const MyOrders = () => {
  const { user, setUserDetails } = useUser();
  const [orders, setOrders] = useState([]);

  console.log(user);

  useEffect(() => {
    const getMyOrders = async () => {
      const ordersList = await fetchUserOrders(user, setUserDetails);
      setOrders(ordersList);
    };
    if(user?.myOrders.length>0)
       getMyOrders();
    // eslint-disable-next-line
  }, []);
  return (
    <div id="my-orders-page">
      <header>
        <h3>Your Orders</h3>
      </header>
      {user?.myOrders.length === 0 ? (
        <NoOrders/>
      ) : (
        <main>
          {orders.map((order) => {
            return <OrderItems key={order._id} order={order} />;
          })}
        </main>
      )}
    </div>
  );
};

export default MyOrders;
