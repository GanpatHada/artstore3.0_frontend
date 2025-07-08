import { useEffect, useState } from "react";
import "./MyOrders.css";
import { fetchUserOrders } from "../../../../services/UserService";
import { useUser } from "../../../../hooks/useUser";
import OrderItems from "../../../../components/order-items/OrderItems";

const MyOrders = () => {
  const { user, setUserDetails } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getMyOrders = async () => {
      const ordersList = await fetchUserOrders(user, setUserDetails);
      setOrders(ordersList);
    };
    getMyOrders();
    // eslint-disable-next-line
  }, []);
  return (
    <div id="my-orders-page">
        <header>
          <h2>My Orders</h2>
        </header>
        <main>
          {
          orders.map(order=>{
            return <OrderItems key={order._id} order={order}/>
          })
        }
        </main>
    </div>
  );
};

export default MyOrders;
