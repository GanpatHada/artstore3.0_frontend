import React, { useContext, useState } from "react";
import "./Cart.css";
import CartItem from "./components/cart-item/CartItem";
import UserContext from "../../context/userContext";
import SpinLoader from "../../components/spin-loader/SpinLoader";
import emptyCart from '../../images/empty_cart.png'
import NoItem from "../../components/no_item/NoItem";
const Cart = () => {
  const{state:{user:{cart}}}=useContext(UserContext);
  const[subTotal,setSubTotal]=useState(0);
  return (
    <div id="cart-page">
      <section id="cart-section">
        <header id="cart-header">
          <span>Shopping Cart</span>
          <span>price</span>
        </header>
        {cart.length>0?<main id="cart-items-wrapper">
          {
            cart.map((cartItem,index)=>{
              return <CartItem key={cartItem} productId={cartItem} setSubTotal={setSubTotal} subTotal={subTotal} />
            })
          }
        </main>:
        <NoItem type='cart'/>}
      </section>
      <section id="checkout-section">
        <section id="checkout-wrapper">
        <p>
          Subtotal ({cart.length} items) : &#8377;<strong>{subTotal}</strong>/-
        </p>
        <button id="proceed-to-buy-button" className="primary-btn">Proceed to Buy</button>
        </section>  
        <section id="recommend-section">
           <h3>Recommendations for all products</h3>
        </section>
      </section>
    </div>
  );
};

export default Cart;
