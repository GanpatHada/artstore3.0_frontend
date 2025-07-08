import { useLocation } from "react-router-dom";
import "./OrderDetails.css";
import OrderItems from "../../../../components/order-items/OrderItems";

const ShippingAddress = ({address}) => {
  const {fullName,city,street,state,phone,pincode}=address
  return (
    <div>
      <header>
        <h5>Ship to</h5>
      </header>
      <main>
        <p>{fullName}</p>
        <p>{street}</p>
        <p>{city},{state},{pincode}</p>
        <p>{phone}</p>
      </main>
    </div>
  );
};

const PaymentMethods = ({paymentInfo}) => {
  return (
    <div>
      <header>
        <h5>Payment Methods</h5>
      </header>
      <main>
        <p>{paymentInfo.method}</p>
      </main>
    </div>
  );
};

const OrderSummary = ({deliveryCharge,amount,items}) => {
  console.log(items)
  
  const {subTotal,quantity}=items.reduce((acc,cur)=>{
     acc.subTotal+=cur.price*cur.quantity;
     acc.quantity+=cur.quantity;
     return acc
  },{subTotal:0,quantity:0})

  return (
    <div>
      <header>
        <h5>Order Summary</h5>
      </header>
      <main>
        <p>
          Items({quantity}) Subtotal: <span>{subTotal}</span>
        </p>
        <p>
          Shipping: <span>{deliveryCharge}</span>
        </p>
        <p>
          <strong>Grand Total:</strong>
          <span>
            <strong>{amount}</strong>
          </span>
        </p>
        <p></p>
      </main>
    </div>
  );
};



const OrderInfo = ({order}) => {
  const {shippingAddress,paymentInfo,deliveryCharge,totalAmount,orderedItems}=order;
  return (
    <div id="order-info">
      <ShippingAddress address={shippingAddress} />
      <PaymentMethods paymentInfo={paymentInfo} />
      <OrderSummary items={orderedItems} deliveryCharge={deliveryCharge} amount={totalAmount} />
    </div>
  );
};

const OrderDetails = ({order:orderParam}) => {
  const location = useLocation();
  const order = location.state?.order || orderParam;

  console.log(order)
  

  
  return (
    <div id="order-details">
      <header>
        <h1>Order Details</h1>
        <div>
          <p>Order on: {order?.createdAt.split("T")[0]}</p>
          <p>Order number: {order?.paymentInfo.orderId}</p>
        </div>
      </header>
      <main>
        <OrderInfo order={order} /> 
        <OrderItems order={order} header={false}/>
      </main>
    </div>
  );
};

export default OrderDetails;
