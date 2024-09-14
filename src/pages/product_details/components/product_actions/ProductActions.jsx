import React, { useContext, useState } from "react";
import "./ProductActions.css";
import { calculatePrice } from "../../../../utils/ProductHelper";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import { addToCart, addToWishlist, isAuthenticated } from "../../../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../../../context/userContext";
const ProductActions = ({ productDetails }) => {
  const{state:{user},dispatch}=useContext(UserContext)  
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    if (!isAuthenticated()) return navigate("/login");
    if (isAvailableInCart(productId)) return navigate("/cart");
    try {
      setLoading(true);
      const result = await addToCart(productId);
      if (result.success) {
        toast.success(result.message);
        dispatch({ type: "ADD_TO_CART", payload: productId });
      }
    } catch (error) {
      toast.error("something went wrong while adding to cart");
    } finally {
      setLoading(false);
    }
  };
  const handleAddToWishlist = async (e, productId) => {
    e.stopPropagation();
    if (!isAuthenticated()) return navigate("/login");
    if (isAvailableInWishlist(productId)) return navigate("/wishlist");
    try {
      setLoading(true);
      const result = await addToWishlist(productId);
      if (result.success) {
        toast.success(result.message);
        dispatch({ type: "ADD_TO_WISHLIST", payload: productId });
      }
    } catch (error) {
      toast.error("something went wrong while adding to wishlist");
    } finally {
      setLoading(false);
    }
  };
  const isAvailableInCart = (productId) => {
    return user?.cart.includes(productId);
  };

  const isAvailableInWishlist = (productId) => {
    return user?.wishlist.includes(productId);
  };

  const { discount, price, artist,_id } = productDetails;
  return (
    <section id="check-out-section">
      {loading && <SpinLoader />}
      <h2>&#8377; {calculatePrice(discount, price)}</h2>
      <span>{calculatePrice(discount, price) >= 500 && "Free delivery"}</span>
      <span id="in-stock-text">In Stock</span>
      <span>
        <strong>Sold By : </strong>
        {artist}
      </span>
      <button className="primary-btn" onClick={(e)=>handleAddToCart(e,_id)}>{isAvailableInCart(_id)?"Go":"Add"} to Cart</button>
      <button id="buy-now">Buy Now</button>
      <button id="add-to-wishlists" onClick={(e)=>handleAddToWishlist(e,_id)}>{isAvailableInWishlist(_id)?"Go":"Add"} to Wishlist</button>
    </section>
  );
};

export default ProductActions;
