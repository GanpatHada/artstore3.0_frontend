import React, { useContext, useEffect } from "react";
import "./Wishlist.css";
import WishlistItem from "./components/wishlistItem/WishlistItem";
import UserContext from "../../context/userContext";
import NoItem from "../../components/no_item/NoItem";
const Wishlist = () => {
  const{state:{user:{wishlist}}}=useContext(UserContext)
  return (
    <div id="wishlist-page">
      {wishlist.length>0?<><header id="wishlist-header"></header>
      <main id="wishlist-item-wrapper">
        {
            wishlist.map(productId=><WishlistItem key={productId} productId={productId} />)
        }
      </main></>:<NoItem type='wishlist'/>}
    </div>
  );
};

export default Wishlist;
