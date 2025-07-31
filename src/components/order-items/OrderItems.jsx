import { Link, useNavigate } from "react-router-dom";
import "./OrderItems.css";
const OrderItem = ({ orderItem }) => {
  const { image, name, product, myReview } = orderItem;
  return (
    <div className="order-item">
      <section className="image-section">
        <img
          src={image}
          alt=""
        />
      </section>
      <section className="info-section">
        <Link to={`/products/${product}`}>{name}</Link>
      </section>
      <section className="action-section">
        <Link
          to={
            myReview
              ? `/products/${product}/review/${myReview._id}`
              : `/products/${product}/review`
          }
        >
          <button className="secondary-btn">{myReview ? 'Edit' : 'Add'} Review</button>
        </Link>

        <Link to={`/products/${product}`}><button className="secondary-btn">View your product</button></Link>
      </section>
    </div>
  );
};

const OrderItemHeader = ({ order }) => {
  const {
    shippingAddress: { fullName },
    totalAmount,
    createdAt: orderDate,
    paymentInfo: { orderId },
  } = order;
  return (
    <header>
      <ul>
        <li>
          <p>ORDER PLACED</p>
          <p>{orderDate.split("T")[0]}</p>
        </li>
        <li>
          <p>TOTAL</p>
          <p>{totalAmount}</p>
        </li>
        <li>
          <p>SHIP TO</p>
          <p>{fullName}</p>
        </li>
        <li>
          <p>ORDER # {orderId}</p>
          <p>
            <Link to={'order_details'} state={{ order }} className="secondary-text-btn">View order details</Link>
          </p>
        </li>
      </ul>
    </header>
  );
};

const OrderItems = ({ order, header = true }) => {
  const { orderedItems } = order;
  return (
    <div className="order-items">
      {header && <OrderItemHeader order={order} />}
      {orderedItems.map(orderItem => {
        return <OrderItem key={orderItem.product} orderItem={orderItem} />
      })

      }
    </div>
  );
};

export default OrderItems;
