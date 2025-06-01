import React, { useState } from "react";
import "./Cart.css";
import CartItem from "./components/cart-item/CartItem";
import NoItem from "../../components/no_item/NoItem";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { cartSubTotal } from "../../utils/UserHelper";
import { useCheckout } from "../../hooks/useCheckout";

const CartHeader = () => {
  return (
    <header id="cart-header">
      <span>Shopping Cart</span>
      <span>price</span>
    </header>
  );
};

const CartContent = ({ selectedCartItems, setSelectedCartItems }) => {
  const {
    user: { cart },
  } = useUser();
  if (cart.length === 0) return <NoItem type="cart" />;
  return (
    <main id="cart-items-wrapper">
      {cart.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.product}
            cartProduct={cartItem}
            setSelectedCartItems={setSelectedCartItems}
            selectedCartItems={selectedCartItems}
          />
        );
      })}
    </main>
  );
};

const FreeDeliveryMessage = () => {
  return (
    <>
      <span id="free-delivery-text">
        <i className="fa-solid fa-circle-check"></i>Your order is eligible for free
        delivery
      </span>
      <span id="free-delivery-info-text">
        Get free delivery on minimum order of &#8377;500
      </span>
    </>
  );
};

const CheckOutBox = ({ selectedCartItems }) => {
  const navigate = useNavigate();
  const {setAmount,setProducts}=useCheckout();
  const handleProceedToBuy=()=>{
     setAmount(cartSubTotal(selectedCartItems));
     setProducts(selectedCartItems)
     navigate("/checkout")
  }

  return (
    <section id="checkout-section">
      <section id="checkout-wrapper">
        {cartSubTotal(selectedCartItems) >= 500 && <FreeDeliveryMessage />}
        {selectedCartItems.length === 0 ? (
          <p>No items selected</p>
        ) : (
          <p>
            Subtotal ({selectedCartItems.reduce((acc,cur)=>{
              acc=acc+cur.quantity
              return acc;
            },0)} item
            {selectedCartItems.length > 1 && "s"}) : &#8377;
            <strong>{cartSubTotal(selectedCartItems)}</strong>/-
          </p>
        )}
        <button
          id="proceed-to-buy-button"
          disabled={selectedCartItems.length === 0}
          className="primary-btn"
          onClick={handleProceedToBuy}
        >
          Proceed to Buy
        </button>
      </section>
     
    </section>
  );
};

const Cart = () => {
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  return (
    <div id="cart-page">
      <section id="cart-section">
        <CartHeader />
        <CartContent
          selectedCartItems={selectedCartItems}
          setSelectedCartItems={setSelectedCartItems}
        />
      </section>
      <CheckOutBox selectedCartItems={selectedCartItems} />
       <section id="recommend-section">
        <h3>Recommendations for all products</h3>
      </section>
    </div>
  );
};

export default Cart;
