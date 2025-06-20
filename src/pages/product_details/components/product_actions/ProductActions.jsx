import React, { useState } from "react";
import "./ProductActions.css";
import SpinLoader from "../../../../components/spin-loader/SpinLoader";
import {
  fetchAddToCart,
  fetchAddToWishlist,
} from "../../../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../../hooks/useUser";
import { useProductDetails } from "../../../../hooks/useProductDetails";
const ProductActions = () => {
  const { user, addToCart, addToWishlist,setUserDetails } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    if (!user) return navigate("/login");
    if (isAvailableInCart(productId)) return navigate("/cart");
    try {
      setLoading(true);
      const result = await fetchAddToCart(user,setUserDetails,productId);
      addToCart(result);
      toast.success("product added to cart");
    } catch (error) {
      toast.error(error.message || "something went wrong while adding to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (e, productId) => {
    e.stopPropagation();
    if (!user) return navigate("/login");
    if (isAvailableInWishlist(productId)) return navigate("/wishlist");
    try {
      setLoading(true);
      const result = await fetchAddToWishlist(user,setUserDetails,productId);
      addToWishlist(result);
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error(
        error.message || "something went wrong while adding to wishlist"
      );
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

  const {
    productDetails: {
      price,
      artist: { fullName },
      _id,
    },
  } = useProductDetails();
  return (
    <section id="check-out-section">
      {loading && <SpinLoader />}
      <h2>&#8377; {price}</h2>
      <span id="free-delivery-text">
        <span>{price >= 500 && "Free delivery"}</span> Your order is eligible
        for free delivery
      </span>
      <span id="in-stock-text">In Stock</span>
      <span id="artist-info">
        <strong>Sold By </strong>
        <h6 id="artist-name"> {fullName}</h6>
      </span>
      <section>
        <button
          className="primary-btn"
          onClick={(e) => handleAddToCart(e, _id)}
        >
          {isAvailableInCart(_id) ? "Go" : "Add"} to Cart
        </button>
        <button id="buy-now">Buy Now</button>
        
      </section>
      <button
          id="add-to-wishlist"
          onClick={(e) => handleAddToWishlist(e, _id)}
        >
          {isAvailableInWishlist(_id) ? "Go" : "Add"} to Wishlist
        </button>
    </section>
  );
};

export default ProductActions;
