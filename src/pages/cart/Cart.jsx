import React, { useContext, useState } from "react";
import "./Cart.css";
import CartItem from "./components/cart-item/CartItem";
import UserContext from "../../context/userContext";
import SpinLoader from "../../components/spin-loader/SpinLoader";
import emptyCart from "../../images/empty_cart.png";
import NoItem from "../../components/no_item/NoItem";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate=useNavigate()
  const {
    state: {
      user: { cart },
    },
  } = useContext(UserContext);
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  const getSubTotal = () => {
    return selectedCartItems.reduce((acc, cur) => {
      return (acc += cur.price);
    }, 0);
  };

  return (
    <div id="cart-page">
      <section id="cart-section">
        <header id="cart-header">
          <span>Shopping Cart</span>
          <span>price</span>
        </header>
        {cart.length > 0 ? (
          <main id="cart-items-wrapper">
            {cart.map((cartItem, index) => {
              return (
                <CartItem
                  key={cartItem}
                  productId={cartItem}
                  setSelectedCartItems={setSelectedCartItems}
                  selectedCartItems={selectedCartItems}
                />
              );
            })}
          </main>
        ) : (
          <NoItem type="cart" />
        )}
      </section>
      <section id="checkout-section">
        <section id="checkout-wrapper">
          {getSubTotal() >= 500 && (
            <>
              <span id="free-delivery-text">
                <i class="fa-solid fa-circle-check"></i>Your order is eligible for free delivery
              </span>
              <span id="free-delivery-info-text">
                Get free delivery on minimum order of &#8377;500
              </span>
            </>
          )}
          {selectedCartItems.length === 0 ? (
            <p>No items selected</p>
          ) : (
            <p>
              Subtotal ({selectedCartItems.length} item{selectedCartItems.length>1&&"s"}) : &#8377;
              <strong>{getSubTotal()}</strong>/-
            </p>
          )}
          <button
            id="proceed-to-buy-button"
            disabled={selectedCartItems.length === 0}
            className="primary-btn"
            onClick={()=>navigate("/checkout")}
          >
            Proceed to Buy
          </button>
        </section>
        <section id="recommend-section">
          <h3>Recommendations for all products</h3>
        </section>
      </section>
    </div>
  );
};

export default Cart;
