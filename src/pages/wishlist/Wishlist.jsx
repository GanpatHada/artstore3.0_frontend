import React, { useContext, useEffect } from "react";
import "./Wishlist.css";
import WishlistItem from "./components/wishlistItem/WishlistItem";
import NoItem from "../../components/no_item/NoItem";
import { useUser } from "../../hooks/useUser";
const Wishlist = () => {
  const{user:{wishlist}}=useUser();
  return (
    <div id="wishlist-page">
      {wishlist.length>0?<>
      <main id="wishlist-item-wrapper">
        {
            wishlist.map(productId=><WishlistItem key={productId} productId={productId} />)
        }
      </main></>:<NoItem type='wishlist'/>}
    </div>
  );
};

export default Wishlist;
